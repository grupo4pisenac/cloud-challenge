# Frontend — Carteira de Clientes da Papelaria (Desafio 08)

Interface web profissional construída para o **Desafio 08 (Carteira de Clientes da Papelaria)** do Cloud Challenge, integrada à API REST Spring Boot (`back/`).

## Como executar o Frontend

### Opção 1 — Com Node.js (Servidor Local na porta 3000)
```bash
cd front
npm start
```
Acesse: `http://localhost:3000`

### Opção 2 — VS Code Live Server ou abrir direto no navegador
Abra o arquivo `front/index.html` com a extensão **Live Server** ou diretamente no navegador.

### Opção 3 — Integrado direto no Spring Boot (`http://localhost:8080`)
Os arquivos estáticos também estão sincronizados em `back/src/main/resources/static/`. Quando o backend Spring Boot estiver rodando (local ou no Azure App Service), abrir a URL raiz `/` exibe automaticamente esta interface web, e `/swagger` redireciona para o Swagger UI.

---

## Requisitos Funcionais e Critérios de Aceitação Atendidos na UI

- **RF1 (`POST /clientes`)**: Modal **Novo Cliente** com código gerado automaticamente pelo banco (`CLI-0001`), validação de nome, e-mail único, telefone e cidade.
- **RF2 (`GET /clientes?nome=` e `GET /clientes/{codigo}`)**: Seletor de busca **Por Parte do Nome** (`ILIKE` sem diferenciar maiúsculas/minúsculas) e **Por Código Exato** (`CLI-0007`), com detecção automática caso um código seja digitado.
- **RF3 (`PATCH /clientes/{codigo}`)**: Modal **Editar** permitindo atualizar exclusivamente `telefone` e `cidade`, mantendo código, nome e e-mail preservados.
- **RF4 (`PATCH /clientes/{codigo}/inativar` e `/reativar`)**: Exclusão lógica (sem botão de excluir), ocultando inativos na busca padrão e exibindo-os com a chave **Incluir inativos (`?incluir_inativos=true`)**.
- **RF5 (`GET /clientes?pagina=N`)**: Paginação de 10 em 10 com indicação exata da posição alfabética (`#1` a `#10`, `#11` a `#20` na página 2).
- **Rota `GET /health` e Prova de Persistência**: Pílula de status no topo exibindo `iniciado_em`, relógio em tempo real (com data e hora visíveis para os prints da pasta `evidencias/`) e Inspector HTTP embutido.
- **Extra LGPD**: Chave **Mascarar tel. (LGPD)** na barra de filtros para ocultar dígitos sensíveis no balcão (`(81) 9••••-0007`) com revelação individual por clique.

