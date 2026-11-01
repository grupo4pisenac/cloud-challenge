-- =====================================================================
-- 02_seed.sql  |  Dados iniciais FICTÍCIOS (RF6, issue #18)
-- 56 clientes: nomes inventados, e-mails @exemplo.com, telefones 90000-xxxx.
-- Idempotente: só insere quem ainda não existe (comparando e-mail),
-- então rodar duas vezes não duplica nem consome a sequência à toa.
--
-- Pontos de atenção para os testes:
--   * CLI-0007 = Ana Silva              (CA2)
--   * "silva" encontra: Ana Silva, Silvana Costa, Roberto Silva,
--                       Jéssica da Silva                     (CA1)
--   * 3 clientes INATIVOS: Camila Rocha, Priscila Andrade,
--                          Wesley Cordeiro                   (CA4)
--   * 53 ativos => 6 páginas de 10 na listagem padrão        (CA5)
-- Execute depois de 01_schema.sql, em banco VAZIO, para os códigos
-- seguirem a ordem abaixo (CLI-0001 ... CLI-0056).
-- =====================================================================

INSERT INTO clientes (nome, email, telefone, cidade, ativo)
SELECT v.nome, v.email, v.telefone, v.cidade, v.ativo
FROM (VALUES
    (1,  'Mariana Oliveira',        'mariana.oliveira@exemplo.com',       '(81) 90000-0001', 'Recife',                    true),
    (2,  'João Pedro Santos',       'joao.santos@exemplo.com',            '(81) 90000-0002', 'Olinda',                    true),
    (3,  'Beatriz Lima',            'beatriz.lima@exemplo.com',           '(81) 90000-0003', 'Jaboatão dos Guararapes',   true),
    (4,  'Carlos Eduardo Pereira',  'carlos.pereira@exemplo.com',         '(81) 90000-0004', 'Recife',                    true),
    (5,  'Fernanda Albuquerque',    'fernanda.albuquerque@exemplo.com',   '(81) 90000-0005', 'Paulista',                  true),
    (6,  'Rafael Menezes',          'rafael.menezes@exemplo.com',         '(81) 90000-0006', 'Camaragibe',                true),
    (7,  'Ana Silva',               'ana.silva@exemplo.com',              '(81) 90000-0007', 'Recife',                    true),
    (8,  'Silvana Costa',           'silvana.costa@exemplo.com',          '(81) 90000-0008', 'Olinda',                    true),
    (9,  'Lucas Barbosa',           'lucas.barbosa@exemplo.com',          '(81) 90000-0009', 'Recife',                    true),
    (10, 'Juliana Cavalcanti',      'juliana.cavalcanti@exemplo.com',     '(81) 90000-0010', 'Igarassu',                  true),
    (11, 'Pedro Henrique Souza',    'pedro.souza@exemplo.com',            '(81) 90000-0011', 'Recife',                    true),
    (12, 'Camila Rocha',            'camila.rocha@exemplo.com',           '(81) 90000-0012', 'Caruaru',                   false),
    (13, 'Gustavo Ferreira',        'gustavo.ferreira@exemplo.com',       '(81) 90000-0013', 'Recife',                    true),
    (14, 'Larissa Almeida',         'larissa.almeida@exemplo.com',        '(81) 90000-0014', 'Olinda',                    true),
    (15, 'Thiago Carvalho',         'thiago.carvalho@exemplo.com',        '(81) 90000-0015', 'Jaboatão dos Guararapes',   true),
    (16, 'Patrícia Gomes',          'patricia.gomes@exemplo.com',         '(81) 90000-0016', 'Recife',                    true),
    (17, 'Roberto Silva',           'roberto.silva@exemplo.com',          '(81) 90000-0017', 'Paulista',                  true),
    (18, 'Aline Martins',           'aline.martins@exemplo.com',          '(81) 90000-0018', 'Recife',                    true),
    (19, 'Diego Ribeiro',           'diego.ribeiro@exemplo.com',          '(81) 90000-0019', 'Camaragibe',                true),
    (20, 'Vanessa Araújo',          'vanessa.araujo@exemplo.com',         '(81) 90000-0020', 'Recife',                    true),
    (21, 'Felipe Nascimento',       'felipe.nascimento@exemplo.com',      '(81) 90000-0021', 'Olinda',                    true),
    (22, 'Letícia Moura',           'leticia.moura@exemplo.com',          '(81) 90000-0022', 'Recife',                    true),
    (23, 'Bruno Teixeira',          'bruno.teixeira@exemplo.com',         '(81) 90000-0023', 'Igarassu',                  true),
    (24, 'Renata Dias',             'renata.dias@exemplo.com',            '(81) 90000-0024', 'Recife',                    true),
    (25, 'Eduardo Monteiro',        'eduardo.monteiro@exemplo.com',       '(81) 90000-0025', 'Jaboatão dos Guararapes',   true),
    (26, 'Cláudia Barros',          'claudia.barros@exemplo.com',         '(81) 90000-0026', 'Recife',                    true),
    (27, 'Marcelo Cunha',           'marcelo.cunha@exemplo.com',          '(81) 90000-0027', 'Paulista',                  true),
    (28, 'Tatiane Freitas',         'tatiane.freitas@exemplo.com',        '(81) 90000-0028', 'Recife',                    true),
    (29, 'Rodrigo Lopes',           'rodrigo.lopes@exemplo.com',          '(81) 90000-0029', 'Olinda',                    true),
    (30, 'Priscila Andrade',        'priscila.andrade@exemplo.com',       '(81) 90000-0030', 'Garanhuns',                 false),
    (31, 'André Vasconcelos',       'andre.vasconcelos@exemplo.com',      '(81) 90000-0031', 'Recife',                    true),
    (32, 'Sandra Pinheiro',         'sandra.pinheiro@exemplo.com',        '(81) 90000-0032', 'Camaragibe',                true),
    (33, 'Leonardo Farias',         'leonardo.farias@exemplo.com',        '(81) 90000-0033', 'Recife',                    true),
    (34, 'Isabela Tavares',         'isabela.tavares@exemplo.com',        '(81) 90000-0034', 'Jaboatão dos Guararapes',   true),
    (35, 'Henrique Duarte',         'henrique.duarte@exemplo.com',        '(81) 90000-0035', 'Recife',                    true),
    (36, 'Débora Machado',          'debora.machado@exemplo.com',         '(81) 90000-0036', 'Olinda',                    true),
    (37, 'Matheus Correia',         'matheus.correia@exemplo.com',        '(81) 90000-0037', 'Recife',                    true),
    (38, 'Natália Batista',         'natalia.batista@exemplo.com',        '(81) 90000-0038', 'Paulista',                  true),
    (39, 'Vinícius Medeiros',       'vinicius.medeiros@exemplo.com',      '(81) 90000-0039', 'Recife',                    true),
    (40, 'Elaine Siqueira',         'elaine.siqueira@exemplo.com',        '(81) 90000-0040', 'Igarassu',                  true),
    (41, 'Gabriel Xavier',          'gabriel.xavier@exemplo.com',         '(81) 90000-0041', 'Recife',                    true),
    (42, 'Luciana Brito',           'luciana.brito@exemplo.com',          '(81) 90000-0042', 'Olinda',                    true),
    (43, 'Fábio Nogueira',          'fabio.nogueira@exemplo.com',         '(81) 90000-0043', 'Jaboatão dos Guararapes',   true),
    (44, 'Cristina Leite',          'cristina.leite@exemplo.com',         '(81) 90000-0044', 'Recife',                    true),
    (45, 'Samuel Peixoto',          'samuel.peixoto@exemplo.com',         '(81) 90000-0045', 'Camaragibe',                true),
    (46, 'Aparecida Santana',       'aparecida.santana@exemplo.com',      '(81) 90000-0046', 'Recife',                    true),
    (47, 'Wesley Cordeiro',         'wesley.cordeiro@exemplo.com',        '(81) 90000-0047', 'Petrolina',                 false),
    (48, 'Mônica Paiva',            'monica.paiva@exemplo.com',           '(81) 90000-0048', 'Recife',                    true),
    (49, 'Tiago Bezerra',           'tiago.bezerra@exemplo.com',          '(81) 90000-0049', 'Olinda',                    true),
    (50, 'Raquel Fontes',           'raquel.fontes@exemplo.com',          '(81) 90000-0050', 'Paulista',                  true),
    (51, 'Jéssica da Silva',        'jessica.silva@exemplo.com',          '(81) 90000-0051', 'Recife',                    true),
    (52, 'Márcio Rego',             'marcio.rego@exemplo.com',            '(81) 90000-0052', 'Jaboatão dos Guararapes',   true),
    (53, 'Simone Arruda',           'simone.arruda@exemplo.com',          '(81) 90000-0053', 'Recife',                    true),
    (54, 'Ricardo Guedes',          'ricardo.guedes@exemplo.com',         '(81) 90000-0054', 'Igarassu',                  true),
    (55, 'Helena Montenegro',       'helena.montenegro@exemplo.com',      '(81) 90000-0055', 'Recife',                    true),
    (56, 'Paulo Vilela',            'paulo.vilela@exemplo.com',           '(81) 90000-0056', 'Olinda',                    true)
) AS v(ord, nome, email, telefone, cidade, ativo)
WHERE NOT EXISTS (
    SELECT 1 FROM clientes c WHERE lower(c.email) = lower(v.email)
)
ORDER BY v.ord;

-- Conferência rápida (esperado: total 56, ativos 53, inativos 3)
SELECT count(*)                          AS total,
       count(*) FILTER (WHERE ativo)     AS ativos,
       count(*) FILTER (WHERE NOT ativo) AS inativos
FROM clientes;
