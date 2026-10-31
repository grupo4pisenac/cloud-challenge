-- =====================================================================
-- 03_consultas_referencia.sql  |  Consultas PARAMETRIZADAS para a API
-- NÃO é script de execução em lote: é o "contrato" entre DADOS e DEV.
-- $1, $2... são parâmetros do driver (psycopg, pg, Npgsql, JDBC...).
-- Nunca monte estas consultas concatenando texto do usuário.
-- =====================================================================

-- ---------------------------------------------------------------------
-- GET /health
-- ---------------------------------------------------------------------
SELECT 1;

-- ---------------------------------------------------------------------
-- RF1  POST /clientes   (código gerado pelo banco)
-- Erro 23505 (unique_violation):
--   constraint/índice = clientes_email_uq  -> 409 "e-mail já cadastrado"
--   (qualquer outro 23505 -> 409 genérico ou 500)
-- Erro 23514 (check_violation) -> 400, mas a validação da API deve barrar antes.
-- $1 nome, $2 email, $3 telefone, $4 cidade
-- ---------------------------------------------------------------------
INSERT INTO clientes (nome, email, telefone, cidade)
VALUES ($1, btrim($2), $3, $4)
RETURNING codigo, nome, email, telefone, cidade, ativo, criado_em;

-- ---------------------------------------------------------------------
-- RF2 + RF4 + RF5  GET /clientes?busca=&incluir_inativos=&pagina=
--   $1 = incluir_inativos (boolean; false por padrão)
--   $2 = padrão já pronto para LIKE, ou NULL se não houve busca.
--        A API ESCAPA \ % _ do texto digitado e coloca os % nas pontas:
--          texto "50%_" -> '%50\%\_%'
--        Em Python:  "%" + t.replace("\\","\\\\").replace("%","\\%").replace("_","\\_") + "%"
--   $3 = tamanho da página (10)
--   $4 = deslocamento = (pagina - 1) * 10
-- "total" vem em todas as linhas (COUNT(*) OVER). Se vier 0 linhas, total = 0.
-- ---------------------------------------------------------------------
SELECT codigo, nome, email, telefone, cidade, ativo, criado_em,
       COUNT(*) OVER () AS total
FROM clientes
WHERE ($1::boolean OR ativo)
  AND ($2::text IS NULL OR nome ILIKE $2)
ORDER BY nome, id
LIMIT $3 OFFSET $4;

-- Observação: se a página pedida estiver além do fim, a consulta volta vazia
-- e o "total" some. Nesse caso, a API pode rodar um COUNT separado:
SELECT COUNT(*) FROM clientes
WHERE ($1::boolean OR ativo)
  AND ($2::text IS NULL OR nome ILIKE $2);

-- ---------------------------------------------------------------------
-- RF2  Busca por código exato (GET /clientes/{codigo})
-- A API normaliza para MAIÚSCULAS (cli-0007 -> CLI-0007) antes de enviar.
-- Zero linhas -> 404. Inclui inativos de propósito (consulta direta).
-- $1 código
-- ---------------------------------------------------------------------
SELECT codigo, nome, email, telefone, cidade, ativo, criado_em
FROM clientes
WHERE codigo = $1;

-- ---------------------------------------------------------------------
-- RF3  PATCH /clientes/{codigo}  (só telefone e cidade)
-- Zero linhas -> 404.
-- $1 código, $2 telefone, $3 cidade
-- Se só um dos campos for enviado, use COALESCE com NULL nos não enviados:
-- ---------------------------------------------------------------------
UPDATE clientes
SET telefone = COALESCE($2, telefone),
    cidade   = COALESCE($3, cidade)
WHERE codigo = $1
RETURNING codigo, nome, email, telefone, cidade, ativo, criado_em;

-- ---------------------------------------------------------------------
-- RF4  Inativar / reativar (NUNCA DELETE)
-- Zero linhas -> 404.
-- Para distinguir "já estava inativo", use o filtro "AND ativo = true":
--   0 linhas -> consulte o código; se existir, já estava inativo (200 idempotente ou 409,
--   conforme decisão do DEV registrada no README).
-- $1 código
-- ---------------------------------------------------------------------
UPDATE clientes SET ativo = false
WHERE codigo = $1
RETURNING codigo, nome, email, telefone, cidade, ativo, criado_em;

UPDATE clientes SET ativo = true
WHERE codigo = $1
RETURNING codigo, nome, email, telefone, cidade, ativo, criado_em;


-- =====================================================================
-- EVIDÊNCIA DO ÍNDICE (issue #5) -> colar o resultado no README
-- Com poucas linhas, o PostgreSQL prefere varredura sequencial. Para
-- mostrar que o índice É utilizável, desligamos a varredura sequencial
-- SÓ nesta sessão (não altere isso na aplicação):
-- =====================================================================
SET enable_seqscan = off;

EXPLAIN (ANALYZE, BUFFERS)
SELECT codigo, nome FROM clientes WHERE nome ILIKE '%silva%';
-- Esperado: "Bitmap Index Scan on idx_clientes_nome_trgm"

EXPLAIN (ANALYZE, BUFFERS)
SELECT codigo, nome FROM clientes WHERE ativo ORDER BY nome, id LIMIT 10 OFFSET 10;
-- Esperado: "Index Scan using idx_clientes_nome_id"

EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM clientes WHERE codigo = 'CLI-0007';
-- Esperado: "Index Scan using clientes_codigo_uq"

RESET enable_seqscan;
