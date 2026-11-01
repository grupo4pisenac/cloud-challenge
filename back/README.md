# API de Clientes — Papelaria

API REST em Java 21 + Spring Boot 4 + PostgreSQL (schema via Flyway).

## Rodar local

Pré-requisitos: Java 21 e Docker.

```bash
docker compose up -d
./mvnw spring-boot:run
```

A API sobe em `http://localhost:8080`. O Flyway cria a tabela e insere 50 clientes fictícios.

Para testar pelo navegador, abra `http://localhost:8080`: a raiz redireciona para o Swagger UI (`/swagger-ui.html`), com todos os endpoints e o botão "Try it out".

## Endpoints

| Método | Rota | O que faz |
|---|---|---|
| POST | `/clientes` | Cadastra (nome, email, telefone, cidade). 201 |
| GET | `/clientes?nome=&incluir_inativos=false&pagina=1` | Busca por parte do nome, 10 por página |
| GET | `/clientes/{codigo}?incluir_inativos=false` | Busca por código. 404 se não achar |
| PATCH | `/clientes/{codigo}` | Edita telefone e cidade |
| PATCH | `/clientes/{codigo}/inativar` | Inativa. 204 |
| PATCH | `/clientes/{codigo}/reativar` | Reativa. 204 |

## Critérios de aceite (curl)

**CA1** — buscar "silva" retorna "Ana SILVA" e "Silvana Costa":

```bash
curl "http://localhost:8080/clientes?nome=silva"
```

**CA2** — buscar por código:

```bash
curl http://localhost:8080/clientes/CLI-0007
```

**CA3** — e-mail repetido (409) e e-mail sem @ (400):

```bash
curl -i -X POST http://localhost:8080/clientes -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"cliente1@exemplo.com"}'

curl -i -X POST http://localhost:8080/clientes -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"testeexemplo.com"}'
```

**CA4** — inativar, buscar, buscar incluindo inativos, reativar:

```bash
curl -i -X PATCH http://localhost:8080/clientes/CLI-0002/inativar
curl "http://localhost:8080/clientes?nome=silva"                         # só Ana
curl "http://localhost:8080/clientes?nome=silva&incluir_inativos=true"   # as duas
curl -i -X PATCH http://localhost:8080/clientes/CLI-0002/reativar
```

**CA5** — página 2 traz os clientes 11 a 20 (ordenados por nome):

```bash
curl "http://localhost:8080/clientes?pagina=2"
```

> No PowerShell use `curl.exe` em vez de `curl`, e aspas duplas escapadas no JSON (`-d "{\"nome\":\"Teste\",...}"`).

## Deploy no Azure App Service (Java SE)

1. Gerar o jar:
   ```bash
   ./mvnw package
   ```
   O artefato sai em `target/app.jar`.
2. No PostgreSQL Flexible Server, **antes da primeira migration**, liberar a extensão: em *Server parameters*, adicionar `PG_TRGM` ao parâmetro `azure.extensions`.
3. No App Service (stack Java SE 21), em *Configuration > Application settings*, criar:
   - `DB_URL` = `jdbc:postgresql://<servidor>.postgres.database.azure.com:5432/papelaria?sslmode=require`
   - `DB_USER` = `<usuario>`
   - `DB_PASSWORD` = `<senha>`
4. Publicar o `app.jar` (ex.: `az webapp deploy --resource-group <rg> --name <app> --src-path target/app.jar --type jar`).

A porta não é fixada no projeto: o App Service define por variável de ambiente.

Opcional: guardar os valores no Key Vault e usar referências nas variáveis, ex.: `@Microsoft.KeyVault(SecretUri=https://<cofre>.vault.azure.net/secrets/db-password/)`.

## Decisões

- **Exclusão lógica:** preserva histórico; pela LGPD, dado de cliente inativo só pode ficar guardado enquanto houver finalidade ou base legal. Por isso a regra é inativar no dia a dia e anonimizar ou eliminar quando o titular pedir ou a finalidade acabar.
- **Código gerado por sequence no banco:** atômico, sem conflito entre requisições simultâneas.
- **ILIKE + índice GIN pg_trgm:** busca por parte do nome sem diferenciar maiúsculas e usando índice mesmo com `%` no início.
