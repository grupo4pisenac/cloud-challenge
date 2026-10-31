## Evidência dos índices (EXPLAIN)

Os planos abaixo foram obtidos no PostgreSQL local, com o seed de 56 clientes (53 ativos), usando `EXPLAIN (ANALYZE, BUFFERS)`. Com tão poucas linhas, o PostgreSQL normalmente prefere a varredura sequencial, que é mais barata. Por isso, só nesta sessão de teste, foi executado `SET enable_seqscan = off;` para provar que os índices **podem ser usados** pelas consultas da API. Essa configuração não é usada pela aplicação.

| Consulta | Requisito | Índice usado | Tempo de execução |
|---|---|---|---|
| `nome ILIKE '%silva%'` | RF2, CA1 | `idx_clientes_nome_trgm` (GIN, `pg_trgm`) | 0,059 ms |
| `ORDER BY nome, id LIMIT 10 OFFSET 10` | RF5, CA5 | `idx_clientes_nome_id` | 0,066 ms |
| `codigo = 'CLI-0007'` | RF2, CA2 | `clientes_codigo_uq` (UNIQUE) | 0,060 ms |

### 1. Busca por parte do nome (RF2, CA1)

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT codigo, nome FROM clientes WHERE nome ILIKE '%silva%';
```

```
Bitmap Heap Scan on clientes  (cost=21.67..25.69 rows=2 width=24) (actual time=0.034..0.037 rows=4.00 loops=1)
  Recheck Cond: ((nome)::text ~~* '%silva%'::text)
  Heap Blocks: exact=1
  Buffers: shared hit=9
  ->  Bitmap Index Scan on idx_clientes_nome_trgm  (cost=0.00..21.67 rows=2 width=0) (actual time=0.017..0.018 rows=4.00 loops=1)
        Index Cond: ((nome)::text ~~* '%silva%'::text)
        Index Searches: 1
        Buffers: shared hit=8
Planning:
  Buffers: shared hit=1
Planning Time: 0.169 ms
Execution Time: 0.059 ms
```

**Leitura:** o `Bitmap Index Scan on idx_clientes_nome_trgm` mostra que o índice trigram atende ao `ILIKE` com `%` no início, algo que um índice comum não faria. Foram devolvidas **4 linhas** (Ana Silva, Silvana Costa, Roberto Silva e Jéssica da Silva), o que confirma o CA1. A estimativa do planejador era 2 linhas; a diferença é normal em tabelas pequenas.

### 2. Listagem paginada, página 2 (RF5, CA5)

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT codigo, nome FROM clientes WHERE ativo ORDER BY nome, id LIMIT 10 OFFSET 10;
```

```
Limit  (cost=2.56..4.99 rows=10 width=32) (actual time=0.037..0.041 rows=10.00 loops=1)
  Buffers: shared hit=2
  ->  Index Scan using idx_clientes_nome_id on clientes  (cost=0.14..12.98 rows=53 width=32) (actual time=0.029..0.039 rows=20.00 loops=1)
        Filter: ativo
        Rows Removed by Filter: 1
        Index Searches: 1
        Buffers: shared hit=2
Planning Time: 0.133 ms
Execution Time: 0.066 ms
```

**Leitura:** o `Index Scan using idx_clientes_nome_id` já devolve as linhas **na ordem de `nome, id`**, sem etapa de ordenação (`Sort`) separada. O `Limit` descarta as 10 primeiras e entrega as 10 seguintes (posições 11 a 20 entre os ativos). O índice leu 20 linhas e o filtro `ativo` removeu 1 (um cliente inativo no meio da ordem), o que mostra a regra RF4 em ação.

### 3. Busca por código exato (RF2, CA2)

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM clientes WHERE codigo = 'CLI-0007';
```

```
Index Scan using clientes_codigo_uq on clientes  (cost=0.14..8.16 rows=1 width=93) (actual time=0.036..0.037 rows=1.00 loops=1)
  Index Cond: ((codigo)::text = 'CLI-0007'::text)
  Index Searches: 1
  Buffers: shared hit=2
Planning Time: 0.137 ms
Execution Time: 0.060 ms
```

**Leitura:** o índice criado automaticamente pela restrição `UNIQUE (codigo)` atende à busca, devolvendo **exatamente 1 linha** (CA2). Não foi preciso criar um índice extra.

### Limitação desta evidência

Com 56 linhas, os tempos (menos de 0,1 ms) não diferenciam uma consulta com índice de uma sem índice. A evidência mostra que o plano **escolhe o índice certo**, e o benefício real aparece com milhares de registros.
