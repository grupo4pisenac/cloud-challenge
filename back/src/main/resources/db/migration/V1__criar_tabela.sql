-- =====================================================================
-- 01_schema.sql  |  Cadastro de Clientes da Papelaria (PostgreSQL)
-- Issues: #3 (DDL), #4 (código CLI-0001), #5 (índices)
-- Idempotente: pode ser executado várias vezes sem erro.
-- =====================================================================

-- Busca por parte do nome (ILIKE '%silva%') com índice.
-- No Azure Database for PostgreSQL, a extensão precisa estar liberada
-- antes (parâmetro de servidor "azure.extensions" = PG_TRGM). Ver db/README.md.
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ---------------------------------------------------------------------
-- Código CLI-0001: gerado pelo BANCO (sequência), não pela aplicação.
-- ---------------------------------------------------------------------
CREATE SEQUENCE IF NOT EXISTS clientes_codigo_seq START WITH 1 INCREMENT BY 1;

-- Formata CLI-0001. Acima de 9999 não trunca: CLI-10000.
-- (lpad() truncaria, por isso a função usa repeat().)
CREATE OR REPLACE FUNCTION proximo_codigo_cliente() RETURNS text AS $$
    SELECT 'CLI-' || repeat('0', greatest(4 - length(n::text), 0)) || n::text
    FROM (SELECT nextval('clientes_codigo_seq') AS n) s;
$$ LANGUAGE sql;

-- ---------------------------------------------------------------------
-- Tabela clientes
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS clientes (
    id        BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo    VARCHAR(20)  NOT NULL DEFAULT proximo_codigo_cliente(),
    nome      VARCHAR(120) NOT NULL,
    email     VARCHAR(254) NOT NULL,
    telefone  VARCHAR(20)  NOT NULL,
    cidade    VARCHAR(80)  NOT NULL,
    ativo     BOOLEAN      NOT NULL DEFAULT true,
    criado_em TIMESTAMPTZ  NOT NULL DEFAULT now(),

    CONSTRAINT clientes_codigo_uq        UNIQUE (codigo),
    CONSTRAINT clientes_codigo_formato   CHECK (codigo ~ '^CLI-[0-9]{4,}$'),
    CONSTRAINT clientes_nome_nao_vazio   CHECK (btrim(nome) <> ''),
    CONSTRAINT clientes_email_formato    CHECK (email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
    CONSTRAINT clientes_telefone_formato CHECK (telefone ~ '^[0-9+() -]{8,20}$'),
    CONSTRAINT clientes_cidade_nao_vazia CHECK (btrim(cidade) <> '')
);

-- Se o script rodar de novo, a sequência continua pertencendo à coluna.
ALTER SEQUENCE clientes_codigo_seq OWNED BY clientes.codigo;

-- ---------------------------------------------------------------------
-- E-mail único SEM diferenciar maiúsculas/minúsculas
-- (ana@exemplo.com e ANA@exemplo.com são o mesmo cliente).
-- Violação -> erro 23505, constraint/índice "clientes_email_uq" -> API responde 409.
-- ---------------------------------------------------------------------
CREATE UNIQUE INDEX IF NOT EXISTS clientes_email_uq ON clientes (lower(email));

-- ---------------------------------------------------------------------
-- Índices de busca (issue #5)
-- ---------------------------------------------------------------------
-- RF2: ILIKE '%silva%' (qualquer parte do nome, sem diferenciar maiúsculas)
CREATE INDEX IF NOT EXISTS idx_clientes_nome_trgm
    ON clientes USING gin (nome gin_trgm_ops);

-- RF5: ORDER BY nome, id com paginação estável (desempate por id)
CREATE INDEX IF NOT EXISTS idx_clientes_nome_id
    ON clientes (nome, id);

-- RF2: busca por código exata é atendida pelo índice UNIQUE de "codigo".
