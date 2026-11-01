CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE SEQUENCE cliente_codigo_seq;

CREATE TABLE clientes (
    id        BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo    VARCHAR(10)  NOT NULL UNIQUE DEFAULT 'CLI-' || LPAD(nextval('cliente_codigo_seq')::text, 4, '0'),
    nome      VARCHAR(120) NOT NULL,
    email     VARCHAR(150) NOT NULL UNIQUE,
    telefone  VARCHAR(20),
    cidade    VARCHAR(80),
    ativo     BOOLEAN      NOT NULL DEFAULT true,
    criado_em TIMESTAMP    NOT NULL DEFAULT now()
);

CREATE INDEX idx_clientes_nome_trgm ON clientes USING gin (nome gin_trgm_ops);
