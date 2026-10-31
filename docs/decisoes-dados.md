# Decisões de dados

## Modelo de dados (para colar no README)

Tabela `clientes` (PostgreSQL):

| Coluna | Tipo | Restrições |
|---|---|---|
| `id` | BIGINT | PK, `GENERATED ALWAYS AS IDENTITY` |
| `codigo` | VARCHAR(20) | `NOT NULL`, `UNIQUE`, padrão gerado pela sequência (`CLI-0001`), `CHECK` formato `^CLI-[0-9]{4,}$` |
| `nome` | VARCHAR(120) | `NOT NULL`, `CHECK` não vazio após `btrim` |
| `email` | VARCHAR(254) | `NOT NULL`, **único sem diferenciar maiúsculas** (índice único em `lower(email)`), `CHECK` de formato com `@` |
| `telefone` | VARCHAR(20) | `NOT NULL`, `CHECK` só dígitos e `+ ( ) - espaço`, 8 a 20 caracteres |
| `cidade` | VARCHAR(80) | `NOT NULL`, `CHECK` não vazia |
| `ativo` | BOOLEAN | `NOT NULL`, `DEFAULT true` |
| `criado_em` | TIMESTAMPTZ | `NOT NULL`, `DEFAULT now()` |

Índices:

| Índice | Finalidade |
|---|---|
| `clientes_codigo_uq` (único) | busca por código exato (RF2, CA2) |
| `clientes_email_uq` (único em `lower(email)`) | impede duplicidade, base do 409 (CA3) |
| `idx_clientes_nome_trgm` (GIN, `pg_trgm`) | `ILIKE '%silva%'` (RF2, CA1) |
| `idx_clientes_nome_id` (`nome, id`) | `ORDER BY nome, id` e paginação (RF5, CA5) |

---

## ADR-1 · Exclusão lógica (inativar) × exclusão física

**Decisão:** nunca excluir. O cliente é inativado (`ativo = false`) e some da busca padrão (RF4).

**O que se ganha**
- Preserva o histórico: o cliente pode voltar (reativar) sem recadastro e sem perder o código.
- Evita o problema original (cadastros duplicados): um e-mail de cliente inativo continua reservado, então um novo cadastro com ele dá 409 em vez de criar duplicata.
- Auditoria e rastreabilidade: o código `CLI-xxxx` nunca é reaproveitado para outra pessoa.

**O que se perde**
- Os dados pessoais continuam armazenados. A LGPD (Lei 13.709/2018) pede finalidade e necessidade no tratamento (art. 6º) e dá ao titular o direito de solicitar a eliminação de dados (art. 18), com o término do tratamento tratado nos arts. 15 e 16. Manter dados de inativos **indefinidamente** e sem justificativa é um risco.
- Mais volume no banco e mais cuidado com segredos e acessos.

**Mitigações recomendadas (próximos passos, fora do escopo da semana)**
- Definir com o dono da papelaria um **prazo de retenção** para inativos e a finalidade da guarda.
- Rotina de **anonimização ou eliminação** a pedido do titular ou após o prazo (por exemplo, trocar nome, e-mail e telefone por valores neutros, mantendo o código).
- Coluna `inativado_em` para controlar o prazo.
- Neste projeto só existem dados fictícios, então a questão é apenas de projeto.

> Este texto descreve o raciocínio do projeto e não substitui orientação jurídica.

---

## ADR-2 · Código gerado por sequência do banco × pela aplicação

**Decisão:** sequência do PostgreSQL (`clientes_codigo_seq`) com função `proximo_codigo_cliente()` como `DEFAULT` da coluna.

**O que se ganha**
- Sem condição de corrida: duas requisições simultâneas nunca recebem o mesmo número. Na aplicação (`SELECT max(...) + 1`), isso exigiria travas ou tentativas repetidas.
- A API fica simples: não calcula nada, apenas faz `INSERT ... RETURNING codigo`.
- Funciona igual para qualquer cliente de banco (API, script de seed, `psql`).

**O que se perde**
- Podem existir **buracos** na numeração: a sequência não volta atrás em `ROLLBACK` nem em inserção rejeitada (por exemplo, e-mail duplicado consome um número). Para um código de identificação isso é aceitável; não é número fiscal.
- A regra de formatação fica no banco (menos visível para quem só lê o código da aplicação). Por isso está documentada aqui e no `01_schema.sql`.
- Acima de `CLI-9999` o código passa a ter 5 dígitos (a função não trunca).

---

## ADR-3 · Busca sem diferenciar maiúsculas: `ILIKE` + índice trigram

**Decisão:** PostgreSQL com `ILIKE` e índice GIN `pg_trgm` em `nome`.

**O que se ganha**
- `ILIKE '%silva%'` encontra "Ana SILVA" e "Silvana Costa" (CA1) e **pode usar índice** mesmo com `%` no início, o que um índice B-tree comum não consegue.
- Simples de usar: um operador, sem precisar de `lower()` nos dois lados.

**O que se perde**
- O índice GIN ocupa espaço e torna as escritas um pouco mais lentas (irrelevante nesta escala).
- Depende da extensão `pg_trgm`, que no Azure precisa ser liberada em `azure.extensions`.
- Não ignora **acentos**: buscar "jose" não encontra "José". Alternativa futura: extensão `unaccent`.
- Com poucas linhas (56), o planejador escolhe varredura sequencial por ser mais barata; o índice só passa a valer a pena com volume maior. A evidência (`EXPLAIN`) em `03_consultas_referencia.sql` desliga a varredura sequencial só na sessão para mostrar que o índice funciona.
- Para `ORDER BY nome`, a ordenação segue a *collation* do banco (acentos e maiúsculas podem alterar a ordem). A página 2 (CA5) é verificada sobre essa mesma ordenação, com desempate por `id`.

**Se fosse Azure SQL:** usar *collation* sem distinção de maiúsculas (`..._CI_AS`) e `LIKE '%x%'`; um índice comum **não** é usado para `%` no início (seria necessário full-text search). Está anotado aqui só como comparação.

---

## ADR-4 (complementar) · E-mail único sem diferenciar maiúsculas

**Decisão:** índice único em `lower(email)` em vez de `UNIQUE(email)` simples.

- **Ganha:** `ANA@exemplo.com` e `ana@exemplo.com` contam como o mesmo cliente, o que ataca diretamente o problema dos duplicados.
- **Perde:** a violação aparece como o índice `clientes_email_uq`, e não como uma constraint de tabela. A API deve identificar o erro pelo SQLSTATE `23505` e esse nome (ver `db/README.md`).
