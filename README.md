# Carteira de Clientes da Papelaria (Desafio 08)

Sistema de cadastro único de clientes para uma papelaria de bairro, com busca rápida e sem perda de histórico (clientes são **inativados**, nunca excluídos). Este repositório contém o back (API), o front (interface do balcão) e o material de QA do grupo.

## Objetivo

Uma papelaria guarda contatos em fichas de papel e no celular do dono. Encontrar um cliente pelo nome é lento e há cadastros duplicados. O sistema resolve isso para o **atendente no balcão**:

| Requisito | O que faz |
|---|---|
| RF1 | Cadastra cliente com código automático (`CLI-0001`), nome, e-mail único, telefone e cidade (dados fictícios) |
| RF2 | Busca por parte do nome (sem diferenciar maiúsculas) e por código exato |
| RF3 | Edita telefone e cidade |
| RF4 | Inativa e reativa cliente; inativos não aparecem na busca padrão |
| RF5 | Paginação de 10 em 10 |
| RF6 | Dados iniciais com 56 clientes fictícios (53 ativos e 3 inativos) |

O objetivo do trabalho de QA foi validar esses requisitos pelos critérios de aceitação (CA1 a CA5), testar segurança básica e provar a persistência dos dados no banco em nuvem.

## Arquitetura

```
┌────────────┐   HTTP/JSON    ┌───────────────────────┐    JDBC (SSL)    ┌──────────────────────────┐
│ Navegador  │ ─────────────► │ Back: Spring Boot     │ ───────────────► │ PostgreSQL               │
│ (front)    │ ◄───────────── │ Java 21, porta 8080   │ ◄─────────────── │ Azure Database for       │
└────────────┘                │ API REST + Flyway     │                  │ PostgreSQL (nuvem)       │
                              │ serve o front em "/"  │                  └──────────────────────────┘
                              └───────────────────────┘
```

- **Front** (`front/`): HTML, CSS e JavaScript puro. Pode ser aberto pelo próprio back (`http://localhost:8080`) ou separado, com Node.js, em `http://localhost:3000`. Há uma cópia dos arquivos em `back/src/main/resources/static/`, e as duas precisam ficar iguais.
- **Back** (`back/`): API REST em Java 21 + Spring Boot. O schema e os dados iniciais são criados pelo Flyway (`V1__criar_tabela.sql` e `V2__seed.sql`).
- **Banco**: PostgreSQL no Azure. O código do cliente é gerado pelo banco (sequence) e a busca usa `ILIKE` com índice `pg_trgm`.
- **Implantação prevista**: Navegador → App Service → PostgreSQL. Nesta entrega o back roda **localmente**, conectado ao banco da nuvem.

### Endpoints

| Método | Rota | O que faz |
|---|---|---|
| POST | `/clientes` | Cadastra (201) |
| GET | `/clientes?nome=&incluir_inativos=false&pagina=1` | Busca por parte do nome, 10 por página |
| GET | `/clientes/{codigo}` | Busca por código (404 se não achar) |
| PATCH | `/clientes/{codigo}` | Edita telefone e/ou cidade |
| PATCH | `/clientes/{codigo}/inativar` | Inativa (204) |
| PATCH | `/clientes/{codigo}/reativar` | Reativa (204) |
| GET | `/health` | Estado da API e do banco (503 se o banco estiver fora) |

A documentação interativa fica em `http://localhost:8080/swagger-ui.html`.

## Como executar

### Pré-requisitos

- **Java 21**
- Acesso ao banco em nuvem (veja abaixo)
- Node.js, só se for rodar o front separado
- Docker, só se for usar um banco local no lugar do da nuvem

### Acesso ao banco em nuvem: peça ao Luiz Eduardo

O banco está hospedado na nuvem e quem o administra é o **Luiz Eduardo**. Antes de rodar o back, solicite a ele:

1. **O arquivo `application.properties`** com a configuração de conexão (ele lê a variável `DATABASE_URL`).
2. **O valor da `DATABASE_URL`**, em mensagem privada.
3. **A liberação do seu IP** no firewall do banco. Sem isso a conexão dá *timeout*. Informe o IP **público** (`curl -4 -s https://api.ipify.org`). Se o seu IP mudar, peça a liberação do novo.

> **Nunca suba o `application.properties` com credenciais, nem a `DATABASE_URL`, para o repositório**, e não os mostre em prints, issues ou mensagens de grupo.

### Passo a passo (macOS ou Linux)

1. Guarde um backup do arquivo original:
   ```bash
   cd back
   cp src/main/resources/application.properties ~/application.properties.original
   ```
2. Copie por cima dele o `application.properties` enviado pelo Luiz Eduardo.
3. Defina a variável sem deixar a senha no histórico do Terminal. Cole só o valor, a partir de `jdbc:postgresql://`:
   ```bash
   read -s DATABASE_URL
   export DATABASE_URL
   echo "$DATABASE_URL" | cut -c1-18      # deve mostrar: jdbc:postgresql://
   ```
4. Suba o back (na mesma janela do Terminal):
   ```bash
   chmod +x mvnw
   export JAVA_HOME=$(/usr/libexec/java_home -v 21)    # no macOS
   ./mvnw spring-boot:run
   ```
5. Espere a linha `Started PapelariaApplication` e confira `http://localhost:8080/health`. Deve mostrar `"status":"ok"` e `"banco":"conectado"`.
6. Abra `http://localhost:8080`. O indicador do topo deve mostrar **API Online**. No painel de configuração, deixe o modo em **`api`**, para a tela nunca cair no simulador local sem aviso.
7. Ao terminar, restaure o arquivo original (para não deixar credenciais no projeto):
   ```bash
   cp ~/application.properties.original src/main/resources/application.properties
   ```

A variável `DATABASE_URL` vale só para a janela do Terminal em que foi definida. Se fechar a janela, repita os passos 3 e 4.

### Alternativa: banco local com Docker

Sem depender do banco em nuvem:

```bash
cd back
docker compose up -d
./mvnw spring-boot:run          # usa o application.properties original (localhost:5432)
```

O Flyway cria a tabela e insere os 56 clientes na primeira subida.

### Front separado (opcional)

```bash
cd front
npm start                        # http://localhost:3000
```

## Material de QA

| Item | Onde |
|---|---|
| Plano de testes e matriz CA → casos | `matriz_testes_papelaria.xlsx` |
| Evidências (prints) | `evidencias/` |

Os testes foram feitos com o back local e o banco PostgreSQL na Azure. Pendências por falta de URL pública do App Service: regressão no ambiente Azure e reinício do App Service na prova de persistência (substituído pelo reinício do back local).

## Problemas conhecidos

- **Busca com curingas.** Os caracteres `%` e `_` na busca funcionam como curingas do `ILIKE` (por exemplo, `%` lista todos os clientes). Severidade baixa.
