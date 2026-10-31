-- =====================================================================
-- 04_verificacao.sql  |  Checagens de CA1-CA5 e das restrições, direto no banco
-- Executar DEPOIS de 01 e 02, em banco recém-criado. Não deixa lixo:
-- os testes que escrevem usam transação com ROLLBACK.
-- NOTA: inserções rejeitadas/revertidas consomem números da sequência.
-- No FINAL deste script a sequência é ressincronizada com o maior código
-- existente, então o próximo cliente real continua de onde parou
-- (ex.: CLI-0057), sem "buraco" causado pelos testes.
-- Cada linha de saída traz: teste | esperado | obtido | OK/FALHA
-- =====================================================================

\echo '--- CA1: busca "silva" (esperado 4: Ana Silva, Silvana Costa, Roberto Silva, Jéssica da Silva)'
SELECT 'CA1' AS teste, '4' AS esperado, count(*)::text AS obtido,
       CASE WHEN count(*) = 4 THEN 'OK' ELSE 'FALHA' END AS resultado
FROM clientes WHERE ativo AND nome ILIKE '%silva%';

\echo '--- CA2: código CLI-0007 retorna exatamente 1 cliente'
SELECT 'CA2' AS teste, '1' AS esperado, count(*)::text AS obtido,
       CASE WHEN count(*) = 1 THEN 'OK' ELSE 'FALHA' END AS resultado
FROM clientes WHERE codigo = 'CLI-0007';

\echo '--- CA4: inativos fora da busca padrão (esperado 53 ativos; 56 com inativos)'
SELECT 'CA4-padrao' AS teste, '53' AS esperado, count(*)::text AS obtido,
       CASE WHEN count(*) = 53 THEN 'OK' ELSE 'FALHA' END AS resultado
FROM clientes WHERE ativo;
SELECT 'CA4-incluir' AS teste, '56' AS esperado, count(*)::text AS obtido,
       CASE WHEN count(*) = 56 THEN 'OK' ELSE 'FALHA' END AS resultado
FROM clientes;

\echo '--- CA5: página 2 = posições 11 a 20 da ordenação por nome (conferir visualmente)'
SELECT row_number() OVER (ORDER BY nome, id) AS posicao, codigo, nome
FROM clientes WHERE ativo
ORDER BY nome, id
LIMIT 10 OFFSET 10;

\echo '--- CA3 / restrições: cada tentativa abaixo DEVE ser rejeitada pelo banco'
DO $$
DECLARE
    tentativas text[][] := ARRAY[
        ['e-mail duplicado',            $q$INSERT INTO clientes (nome,email,telefone,cidade) VALUES ('Teste','ana.silva@exemplo.com','(81) 90000-9999','Recife')$q$],
        ['e-mail duplicado (maiúsculas)',$q$INSERT INTO clientes (nome,email,telefone,cidade) VALUES ('Teste','ANA.SILVA@EXEMPLO.COM','(81) 90000-9999','Recife')$q$],
        ['e-mail sem @',                $q$INSERT INTO clientes (nome,email,telefone,cidade) VALUES ('Teste','semarroba.exemplo.com','(81) 90000-9999','Recife')$q$],
        ['nome vazio',                  $q$INSERT INTO clientes (nome,email,telefone,cidade) VALUES ('   ','vazio@exemplo.com','(81) 90000-9999','Recife')$q$],
        ['telefone com letras',         $q$INSERT INTO clientes (nome,email,telefone,cidade) VALUES ('Teste','tel@exemplo.com','abc-defg-hij','Recife')$q$],
        ['cidade vazia',                $q$INSERT INTO clientes (nome,email,telefone,cidade) VALUES ('Teste','cid@exemplo.com','(81) 90000-9999','')$q$],
        ['código fora do formato',      $q$INSERT INTO clientes (codigo,nome,email,telefone,cidade) VALUES ('XYZ','Teste','cod@exemplo.com','(81) 90000-9999','Recife')$q$]
    ];
    i int;
    rejeitou boolean;
BEGIN
    FOR i IN 1 .. array_length(tentativas, 1) LOOP
        rejeitou := false;
        BEGIN
            EXECUTE tentativas[i][2];
        EXCEPTION WHEN unique_violation OR check_violation THEN
            rejeitou := true;
        END;
        RAISE NOTICE '% | esperado: rejeitar | obtido: % | %',
            tentativas[i][1],
            CASE WHEN rejeitou THEN 'rejeitado' ELSE 'ACEITO' END,
            CASE WHEN rejeitou THEN 'OK' ELSE 'FALHA' END;
    END LOOP;
    -- Desfaz qualquer linha aceita por engano, mantendo o banco limpo
    DELETE FROM clientes WHERE nome = 'Teste' OR email IN ('vazio@exemplo.com','cid@exemplo.com','cod@exemplo.com');
END $$;

\echo '--- Código por sequência: 3 inserções seguidas geram códigos consecutivos (desfeito com ROLLBACK)'
BEGIN;
INSERT INTO clientes (nome,email,telefone,cidade) VALUES
    ('Teste A','a.verif@exemplo.com','(81) 90000-9001','Recife'),
    ('Teste B','b.verif@exemplo.com','(81) 90000-9002','Recife'),
    ('Teste C','c.verif@exemplo.com','(81) 90000-9003','Recife')
RETURNING codigo, nome;
ROLLBACK;
-- Obs.: a sequência NÃO volta no ROLLBACK (é o comportamento esperado e
-- aparece como "buraco" na numeração; ver docs/decisoes-dados.md).

\echo '--- Ressincroniza a sequência com o maior código existente (remove o buraco dos testes)'
SELECT setval('clientes_codigo_seq',
              COALESCE(max(substring(codigo FROM 5)::int), 1),
              count(*) > 0) AS sequencia_ajustada_para
FROM clientes;
