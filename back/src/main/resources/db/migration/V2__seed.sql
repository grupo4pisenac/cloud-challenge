-- O codigo nunca e informado: quem gera e a sequence cliente_codigo_seq.
INSERT INTO clientes (nome, email, telefone, cidade) VALUES
    ('Ana SILVA',     'cliente1@exemplo.com', '(00) 90000-0001', 'Recife'),
    ('Silvana Costa', 'cliente2@exemplo.com', '(00) 90000-0002', 'Olinda');

-- Mais 48 clientes combinando nomes e sobrenomes (nenhum contem "silva").
INSERT INTO clientes (nome, email, telefone, cidade)
SELECT
    (ARRAY['Bruno','Carla','Diego','Elisa','Fabio','Gabriela','Heitor','Isabela',
           'Joao','Karina','Lucas','Mariana','Nicolas','Olivia','Pedro','Rafaela'])[1 + (n % 16)]
    || ' ' ||
    (ARRAY['Almeida','Barbosa','Cavalcanti','Duarte','Ferreira','Gomes',
           'Lima','Monteiro','Nogueira','Pereira','Ramos','Teixeira'])[1 + ((n / 16) + n) % 12],
    'cliente' || n || '@exemplo.com',
    '(00) 9' || LPAD((n * 137 % 10000)::text, 4, '0') || '-' || LPAD(n::text, 4, '0'),
    (ARRAY['Recife','Olinda','Jaboatao dos Guararapes','Caruaru','Petrolina',
           'Paulista','Garanhuns','Cabo de Santo Agostinho'])[1 + (n % 8)]
FROM generate_series(3, 50) AS n;
