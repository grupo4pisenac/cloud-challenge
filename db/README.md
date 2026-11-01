# Banco de dados

PostgreSQL (Azure Database for PostgreSQL – Flexible Server).

| Arquivo | Para quê |
|---|---|
| `01_schema.sql` | Extensão, sequência, tabela, restrições e índices (idempotente) |
| `02_seed.sql` | 56 clientes fictícios (idempotente) |
| `03_consultas_referencia.sql` | Consultas parametrizadas que a API deve usar + `EXPLAIN` |
| `04_verificacao.sql` | Checagens dos critérios CA1–CA5 direto no banco |

## Como executar

```bash
# 1) Variável de ambiente (nunca no código; .env fica fora do Git)
#    Formato:  postgresql://USUARIO:SENHA@SERVIDOR.postgres.database.azure.com:5432/BANCO?sslmode=require
export DATABASE_URL="postgresql://..."

# 2) Schema e dados (nesta ordem)
psql "$DATABASE_URL" -f db/01_schema.sql
psql "$DATABASE_URL" -f db/02_seed.sql

# 3) Verificação (opcional; ressincroniza a sequência no final)
psql "$DATABASE_URL" -f db/04_verificacao.sql
```

Para recomeçar do zero **em ambiente local/de teste**:

```sql
DROP TABLE IF EXISTS clientes CASCADE;
DROP SEQUENCE IF EXISTS clientes_codigo_seq;
DROP FUNCTION IF EXISTS proximo_codigo_cliente();
```

> Não rode isso no banco da entrega depois das evidências E2, senão os prints perdem a correspondência.

## Azure: pontos que costumam travar

1. **`pg_trgm` não liberada.** Se `CREATE EXTENSION` falhar com "extension is not allow-listed", no portal vá em *Server parameters* → `azure.extensions` → marque `PG_TRGM` → salvar → rodar o schema de novo.
2. **Firewall.** Libere o IP de quem vai rodar o `psql` e permita o acesso do App Service (opção "Allow public access from any Azure service" ou os IPs de saída do App Service). Não use a faixa `0.0.0.0–255.255.255.255`.
3. **SSL.** O servidor exige conexão segura; mantenha `?sslmode=require` na `DATABASE_URL`.
4. **Usuário da aplicação.** O mesmo usuário que cria o schema é dono da tabela e da sequência. Se criarem um usuário separado, deem `GRANT SELECT, INSERT, UPDATE ON clientes` e `GRANT USAGE ON SEQUENCE clientes_codigo_seq`.

## Contrato DADOS ↔ DEV

| Situação | Como a API reconhece | Resposta |
|---|---|---|
| E-mail duplicado | SQLSTATE `23505` com constraint/índice `clientes_email_uq` | **409** |
| Violação de CHECK | SQLSTATE `23514` | **400** (a validação da API deve barrar antes) |
| Banco indisponível / timeout | erro de conexão | **503** |
| Qualquer outro erro | – | **500** genérico, sem detalhes |

- O e-mail é único **sem diferenciar maiúsculas**; a API pode guardar como o usuário digitou, mas deve fazer `btrim`.
- A API **não calcula o código**: não envie `codigo` no `INSERT`.
- `ORDER BY nome, id` é obrigatório na listagem (paginação estável, CA5).
- Escapar `\`, `%` e `_` na busca por nome. Ver `03_consultas_referencia.sql`.
