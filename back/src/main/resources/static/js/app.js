/**
 * Papelaria Central — Carteira de Clientes (Desafio 08)
 * Frontend Application Controller & API Integration
 */

(() => {
  'use strict';

  // =====================================================================
  // 1. DADOS INICIAIS DO SEED (Espelho exato de V2__seed.sql - 56 clientes)
  // =====================================================================
  const SEED_LIEN = [main id: 1, codigo: 'CLI-0001', nome: 'Mariana Oliveira', email: 'mariana.oliveira@exemplo.com', telefone: '(81) 90000-0001', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:01' },
  { id: 2, codigo: 'CLI-0002', nome: 'João Pedro Santos', email: 'joao.santos@exemplo.com', telefone: '(81) 90000-0002', cidade: 'Olinda', ativo: true, criadoEm: '2026-11-02T18:00:02' },
  { id: 3, codigo: 'CLI-0003', nome: 'Beatriz Lima', email: 'beatriz.lima@exemplo.com', telefone: '(81) 90000-0003', cidade: 'Jaboatão dos Guararapes', ativo: true, criadoEm: '2026-11-02T18:00:03' },
  { id: 4, codigo: 'CLI-0004', nome: 'Carlos Eduardo Pereira', email: 'carlos.pereira@exemplo.com', telefone: '(81) 90000-0004', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:04' },
  { id: 5, codigo: 'CLI-0005', nome: 'Fernanda Albuquerque', email: 'fernanda.albuquerque@exemplo.com', telefone: '(81) 90000-0005', cidade: 'Paulista', ativo: true, criadoEm: '2026-11-02T18:00:05' },
  { id: 6, codigo: 'CLI-0006', nome: 'Rafael Menezes', email: 'rafael.menezes@exemplo.com', telefone: '(81) 90000-0006', cidade: 'Camaragibe', ativo: true, criadoEm: '2026-11-02T18:00:06' },
  { id: 7, codigo: 'CLI-0007', nome: 'Ana Silva', email: 'ana.silva@exemplo.com', telefone: '(81) 90000-0007', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:07' },
  { id: 8, codigo: 'CLI-0008', nome: 'Silvana Costa', email: 'silvana.costa@exemplo.com', telefone: '(81) 90000-0008', cidade: 'Olinda', ativo: true, criadoEm: '2026-11-02T18:00:08' },
  { id: 9, codigo: 'CLI-0009', nome: 'Lucas Barbosa', email: 'lucas.barbosa@exemplo.com', telefone: '(81) 90000-0009', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:09' },
  { id: 10, codigo: 'CLI-0010', nome: 'Juliana Cavalcanti', email: 'juliana.cavalcanti@exemplo.com', telefone: '(81) 90000-0010', cidade: 'Igarassu', ativo: true, criadoEm: '2026-11-02T18:00:10' },
  { id: 11, codigo: 'CLI-0011', nome: 'Pedro Henrique Souza', email: 'pedro.souza@exemplo.com', telefone: '(81) 90000-0011', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:11' },
  { id: 12, codigo: 'CLI-0012', nome: 'Camila Rocha', email: 'camila.rocha@exemplo.com', telefone: '(81) 90000-0012', cidade: 'Caruaru', ativo: false, criadoEm: '2026-11-02T18:00:12' },
  { id: 13, codigo: 'CLI-0013', nome: 'Gustavo Ferreira', email: 'gustavo.ferreira@exemplo.com', telefone: '(81) 90000-0013', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:13' },
  { id: 14, codigo: 'CLI-0014', nome: 'Larissa Almeida', email: 'larissa.almeida@exemplo.com', telefone: '(81) 90000-0014', cidade: 'Olinda', ativo: true, criadoEm: '2026-11-02T18:00:14' },
  { id: 15, codigo: 'CLI-0015', nome: 'Thiago Carvalho', email: 'thiago.carvalho@exemplo.com', telefone: '(81) 90000-0015', cidade: 'Jaboatão dos Guararapes', ativo: true, criadoEm: '2026-11-02T18:00:15' },
  { id: 16, codigo: 'CLI-0016', nome: 'Patrícia Gomes', email: 'patricia.gomes@exemplo.com', telefone: '(81) 90000-0016', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:16' },
  { id: 17, codigo: 'CLI-0017', nome: 'Roberto Silva', email: 'roberto.silva@exemplo.com', telefone: '(81) 90000-0017', cidade: 'Paulista', ativo: true, criadoEm: '2026-11-02T18:00:17' },
  { id: 18, codigo: 'CLI-0018', nome: 'Aline Martins', email: 'aline.martins@exemplo.com', telefone: '(81) 90000-0018', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:18' },
  { id: 19, codigo: 'CLI-0019', nome: 'Diego Ribeiro', email: 'diego.ribeiro@exemplo.com', telefone: '(81) 90000-0019', cidade: 'Camaragibe', ativo: true, criadoEm: '2026-11-02T18:00:19' },
  { id: 20, codigo: 'CLI-0020', nome: 'Vanessa Araújo', email: 'vanessa.araujo@exemplo.com', telefone: '(81) 90000-0020', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:20' },
  { id: 21, codigo: 'CLI-0021', nome: 'Felipe Nascimento', email: 'felipe.nascimento@exemplo.com', telefone: '(81) 90000-0021', cidade: 'Olinda', ativo: true, criadoEm: '2026-11-02T18:00:21' },
  { id: 22, codigo: 'CLI-0022', nome: 'Letícia Moura', email: 'leticia.moura@exemplo.com', telefone: '(81) 90000-0022', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:22' },
  { id: 23, codigo: 'CLI-0023', nome: 'Bruno Teixeira', email: 'bruno.teixeira@exemplo.com', telefone: '(81) 90000-0023', cidade: 'Igarassu', ativo: true, criadoEm: '2026-11-02T18:00:23' },
  { id: 24, codigo: 'CLI-0024', nome: 'Renata Dias', email: 'renata.dias@exemplo.com', telefone: '(81) 90000-0024', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:24' },
  { id: 25, codigo: 'CLI-0025', nome: 'Eduardo Monteiro', email: 'eduardo.monteiro@exemplo.com', telefone: '(81) 90000-0025', cidade: 'Jaboatão dos Guararapes', ativo: true, criadoEm: '2026-11-02T18:00:25' },
  { id: 26, codigo: 'CLI-0026', nome: 'Cláudia Barros', email: 'claudia.barros@exemplo.com', telefone: '(81) 90000-0026', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:26' },
  { id: 27, codigo: 'CLI-0027', nome: 'Marcelo Cunha', email: 'marcelo.cunha@exemplo.com', telefone: '(81) 90000-0027', cidade: 'Paulista', ativo: true, criadoEm: '2026-11-02T18:00:27' },
  { id: 28, codigo: 'CLI-0028', nome: 'Tatiane Freitas', email: 'tatiane.freitas@exemplo.com', telefone: '(81) 90000-0028', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:28' },
  { id: 29, codigo: 'CLI-0029', nome: 'Rodrigo Lopes', email: 'rodrigo.lopes@exemplo.com', telefone: '(81) 90000-0029', cidade: 'Olinda', ativo: true, criadoEm: '2026-11-02T18:00:29' },
  { id: 30, codigo: 'CLI-0030', nome: 'Priscila Andrade', email: 'priscila.andrade@exemplo.com', telefone: '(81) 90000-0030', cidade: 'Garanhuns', ativo: false, criadoEm: '2026-11-02T18:00:30' },
  { id: 31, codigo: 'CLI-0031', nome: 'André Vasconcelos', email: 'andre.vasconcelos@exemplo.com', telefone: '(81) 90000-0031', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:31' },
  { id: 32, codigo: 'CLI-0032', nome: 'Sandra Pinheiro', email: 'sandra.pinheiro@exemplo.com', telefone: '(81) 90000-0032', cidade: 'Camaragibe', ativo: true, criadoEm: '2026-11-02T18:00:32' },
  { id: 33, codigo: 'CLI-0033', nome: 'Leonardo Farias', email: 'leonardo.farias@exemplo.com', telefone: '(81) 90000-0033', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:33' },
  { id: 34, codigo: 'CLI-0034', nome: 'Isabela Tavares', email: 'isabela.tavares@exemplo.com', telefone: '(81) 90000-0034', cidade: 'Jaboatão dos Guararapes', ativo: true, criadoEm: '2026-11-02T18:00:34' },
  { id: 35, codigo: 'CLI-0035', nome: 'Henrique Duarte', email: 'henrique.duarte@exemplo.com', telefone: '(81) 90000-0035', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:35' },
  { id: 36, codigo: 'CLI-0036', nome: 'Débora Machado', email: 'debora.machado@exemplo.com', telefone: '(81) 90000-0036', cidade: 'Olinda', ativo: true, criadoEm: '2026-11-02T18:00:36' },
  { id: 37, codigo: 'CLI-0037', nome: 'Matheus Correia', email: 'matheus.correia@exemplo.com', telefone: '(81) 90000-0037', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:37' },
  { id: 38, codigo: 'CLI-0038', nome: 'Natália Batista', email: 'natalia.batista@exemplo.com', telefone: '(81) 90000-0038', cidade: 'Paulista', ativo: true, criadoEm: '2026-11-02T18:00:38' },
  { id: 39, codigo: 'CLI-0039', nome: 'Vinícius Medeiros', email: 'vinicius.medeiros@exemplo.com', telefone: '(81) 90000-0039', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:39' },
  { id: 40, codigo: 'CLI-0040', nome: 'Elaine Siqueira', email: 'elaine.siqueira@exemplo.com', telefone: '(81) 90000-0040', cidade: 'Igarassu', ativo: true, criadoEm: '2026-11-02T18:00:40' },
  { id: 41, codigo: 'CLI-0041', nome: 'Gabriel Xavier', email: 'gabriel.xavier@exemplo.com', telefone: '(81) 90000-0041', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:41' },
  { id: 42, codigo: 'CLI-0042', nome: 'Luciana Brito', email: 'luciana.brito@exemplo.com', telefone: '(81) 90000-0042', cidade: 'Olinda', ativo: true, criadoEm: '2026-11-02T18:00:42' },
  { id: 43, codigo: 'CLI-0043', nome: 'Fábio Nogueira', email: 'fabio.nogueira@exemplo.com', telefone: '(81) 90000-0043', cidade: 'Jaboatão dos Guararapes', ativo: true, criadoEm: '2026-11-02T18:00:43' },
  { id: 44, codigo: 'CLI-0044', nome: 'Cristina Leite', email: 'cristina.leite@exemplo.com', telefone: '(81) 90000-0044', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:44' },
  { id: 45, codigo: 'CLI-0045', nome: 'Samuel Peixoto', email: 'samuel.peixoto@exemplo.com', telefone: '(81) 90000-0045', cidade: 'Camaragibe', ativo: true, criadoEm: '2026-11-02T18:00:45' },
  { id: 46, codigo: 'CLI-0046', nome: 'Aparecida Santana', email: 'aparecida.santana@exemplo.com', telefone: '(81) 90000-0046', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:46' },
  { id: 47, codigo: 'CLI-0047', nome: 'Wesley Cordeiro', email: 'wesley.cordeiro@exemplo.com', telefone: '(81) 90000-0047', cidade: 'Petrolina', ativo: false, criadoEm: '2026-11-02T18:00:47' },
  { id: 48, codigo: 'CLI-0048', nome: 'Mônica Paiva', email: 'monica.paiva@exemplo.com', telefone: '(81) 90000-0048', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:48' },
  { id: 49, codigo: 'CLI-0049', nome: 'Tiago Bezerra', email: 'tiago.bezerra@exemplo.com', telefone: '(81) 90000-0049', cidade: 'Olinda', ativo: true, criadoEm: '2026-11-02T18:00:49' },
  { id: 50, codigo: 'CLI-0050', nome: 'Raquel Fontes', email: 'raquel.fontes@exemplo.com', telefone: '(81) 90000-0050', cidade: 'Paulista', ativo: true, criadoEm: '2026-11-02T18:00:50' },
  { id: 51, codigo: 'CLI-0051', nome: 'Jéssica da Silva', email: 'jessica.silva@exemplo.com', telefone: '(81) 90000-0051', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:51' },
  { id: 52, codigo: 'CLI-0052', nome: 'Márcio Rego', email: 'marcio.rego@exemplo.com', telefone: '(81) 90000-0052', cidade: 'Jaboatão dos Guararapes', ativo: true, criadoEm: '2026-11-02T18:00:52' },
  { id: 53, codigo: 'CLI-0053', nome: 'Simone Arruda', email: 'simone.arruda@exemplo.com', telefone: '(81) 90000-0053', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:53' },
  { id: 54, codigo: 'CLI-0054', nome: 'Ricardo Guedes', email: 'ricardo.guedes@exemplo.com', telefone: '(81) 90000-0054', cidade: 'Igarassu', ativo: true, criadoEm: '2026-11-02T18:00:54' },
  { id: 55, codigo: 'CLI-0055', nome: 'Helena Montenegro', email: 'helena.montenegro@exemplo.com', telefone: '(81) 90000-0055', cidade: 'Recife', ativo: true, criadoEm: '2026-11-02T18:00:55' },
  { id: 56, codigo: 'CLI-0056', nome: 'Paulo Vilela', email: 'paulo.vilela@exemplo.com', telefone: '(81) 90000-0056', cidade: 'Olinda', ativo: true, criadoEm: '2026-11-02T18:00:56' }
  ];

const STORAGE_KEYS = {
  API_URL: 'papelaria_api_url_v1',
  OP_MODE: 'papelaria_op_mode_v1',
  MOCK_DB: 'papelaria_mock_db_v1',
  MOCK_SEQ: 'papelaria_mock_seq_v1',
  MOCK_START: 'papelaria_mock_started_v1'
};

// Detecta URL padrão inteligente (mesma origem se rodando na porta 8080 ou Azure, senão localhost:8080)
function getDefaultApiUrl() {
  const saved = localStorage.getItem(STORAGE_KEYS.API_URL);
  if (saved) return saved.replace(/\/+$/, '');
  const { protocol, hostname, port } = window.location;
  if (protocol.startsWith('http') && (port === '8080' || hostname.endsWith('.azurewebsites.net'))) {
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
  }
  return 'http://localhost:8080';
}

// Estado Global da Interface
const state = {
  apiBaseUrl: getDefaultApiUrl(),
  operationMode: localStorage.getItem(STORAGE_KEYS.OP_MODE) || 'auto', // 'auto' | 'api' | 'mock'
  usingSimulator: false,
  healthData: null,

  // Filtros e Busca
  searchMode: 'nome', // 'nome' | 'codigo'
  searchTerm: '',
  incluirInativos: false,
  mascararTelefone: false,
  revealedPhones: new Set(),
  pagina: 1,

  // Resultado Atual
  clientes: [],
  totalPaginas: 1,
  totalElementos: 0,
  lastErrorStatus: null,
  lastErrorMessage: null,

  // Logs de Requisição HTTP
  apiLogs: []
};

// =====================================================================
// 2. SIMULADOR FIEL DO BACKEND (Caso localhost:8080 esteja offline)
// =====================================================================
const LocalSimulator = {
  getClientes() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.MOCK_DB);
      if (raw) return JSON.parse(raw);
    } catch (_) { }
    this.reset();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.MOCK_DB));
  },

  saveClientes(list) {
    localStorage.setItem(STORAGE_KEYS.MOCK_DB, JSON.stringify(list));
  },

  getNextSeq() {
    const current = parseInt(localStorage.getItem(STORAGE_KEYS.MOCK_SEQ) || '56', 10) + 1;
    localStorage.setItem(STORAGE_KEYS.MOCK_SEQ, String(current));
    const pad = Math.max(4 - String(current).length, 0);
    return 'CLI-' + '0'.repeat(pad) + String(current);
  },

  getIniciadoEm() {
    let ts = localStorage.getItem(STORAGE_KEYS.MOCK_START);
    if (!ts) {
      ts = new Date().toISOString().replace('Z', '-03:00');
      localStorage.setItem(STORAGE_KEYS.MOCK_START, ts);
    }
    return ts;
  },

  reset() {
    localStorage.setItem(STORAGE_KEYS.MOCK_DB, JSON.stringify(SEED_CLIENTES));
    localStorage.setItem(STORAGE_KEYS.MOCK_SEQ, '56');
    localStorage.setItem(STORAGE_KEYS.MOCK_START, new Date().toISOString());
  },

  // Valida exatamente como ClienteRequest.java + ErroHandler.java
  validarCadastro(body) {
    const erros = new Set();
    const nome = body?.nome ?? '';
    const email = body?.email ?? '';
    const telefone = body?.telefone ?? '';
    const cidade = body?.cidade ?? '';

    if (!String(nome).trim()) {
      erros.add('nome é obrigatório');
    } else if (String(nome).length > 120) {
      erros.add('nome deve ter no máximo 120 caracteres');
    }

    if (!String(email).trim()) {
      erros.add('email é obrigatório');
    } else {
      if (String(email).length > 254) {
        erros.add('email deve ter no máximo 254 caracteres');
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(email))) {
        erros.add('email inválido');
      }
    }

    if (!String(telefone).trim()) {
      erros.add('telefone é obrigatório');
    } else if (!/^[0-9+() -]{8,20}$/.test(String(telefone))) {
      erros.add('telefone inválido');
    }

    if (!String(cidade).trim()) {
      erros.add('cidade é obrigatória');
    } else if (String(cidade).length > 80) {
      erros.add('cidade deve ter no máximo 80 caracteres');
    }

    return Array.from(erros).sort().join('; ');
  },

  validarAtualizacao(body) {
    const erros = new Set();
    if (body?.telefone !== null && body?.telefone !== undefined) {
      if (!/^[0-9+() -]{8,20}$/.test(String(body.telefone))) {
        erros.add('telefone inválido');
      }
    }
    if (body?.cidade !== null && body?.cidade !== undefined) {
      if (!/.*\S.*/.test(String(body.cidade))) {
        erros.add('cidade não pode ser vazia');
      }
      if (String(body.cidade).length > 80) {
        erros.add('cidade deve ter no máximo 80 caracteres');
      }
    }
    return Array.from(erros).sort().join('; ');
  },

  handleRequest(method, path, body) {
    const urlObj = new URL(path, 'http://localhost:8080');
    const pathname = urlObj.pathname;
    const params = urlObj.searchParams;

    // 1. GET /health
    if (method === 'GET' && pathname === '/health') {
      return {
        status: 200,
        statusText: 'OK',
        data: {
          iniciado_em: this.getIniciadoEm(),
          status: 'ok',
          banco: 'conectado (simulador local)'
        }
      };
    }

    const clientes = this.getClientes();

    // 2. POST /clientes
    if (method === 'POST' && pathname === '/clientes') {
      const msgValidacao = this.validarCadastro(body);
      if (msgValidacao) {
        return { status: 400, statusText: 'Bad Request', data: { erro: msgValidacao } };
      }
      const emailNorm = String(body.email).trim().toLowerCase();
      if (clientes.some(c => c.email.toLowerCase() === emailNorm)) {
        return { status: 409, statusText: 'Conflict', data: { erro: 'e-mail já cadastrado' } };
      }
      const novo = {
        id: clientes.length + 1,
        codigo: this.getNextSeq(),
        nome: String(body.nome).trim(),
        email: emailNorm,
        telefone: String(body.telefone),
        cidade: String(body.cidade).trim(),
        ativo: true,
        criadoEm: new Date().toISOString()
      };
      clientes.push(novo);
      this.saveClientes(clientes);
      return { status: 201, statusText: 'Created', data: novo };
    }

    // 3. GET /clientes (Listagem com filtro por nome e paginação de 10 em 10)
    if (method === 'GET' && pathname === '/clientes') {
      const nomeFiltro = (params.get('nome') || '').trim().toLowerCase();
      const incluirInativos = params.get('incluir_inativos') === 'true';
      const pagina = parseInt(params.get('pagina') || '1', 10);

      if (isNaN(pagina) || pagina < 1) {
        return { status: 400, statusText: 'Bad Request', data: { erro: 'pagina deve ser maior ou igual a 1' } };
      }

      const filtrados = clientes
        .filter(c => {
          if (!incluirInativos && !c.ativo) return false;
          if (!nomeFiltro) return true;
          return c.nome.toLowerCase().includes(nomeFiltro);
        })
        .sort((a, b) => {
          const cmp = a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' });
          return cmp !== 0 ? cmp : (a.id - b.id);
        });

      const totalElementos = filtrados.length;
      const totalPaginas = Math.max(Math.ceil(totalElementos / 10), 0);
      const offset = (pagina - 1) * 10;
      const conteudo = filtrados.slice(offset, offset + 10);

      return {
        status: 200,
        statusText: 'OK',
        data: {
          conteudo,
          pagina,
          totalPaginas,
          totalElementos
        }
      };
    }

    // 4. Rotas /clientes/{codigo}/inativar e /clientes/{codigo}/reativar
    const matchAcao = pathname.match(/^\/clientes\/([^/]+)\/(inativar|reativar)$/);
    if (method === 'PATCH' && matchAcao) {
      const codigo = decodeURIComponent(matchAcao[1]);
      const acao = matchAcao[2];
      const idx = clientes.findIndex(c => c.codigo === codigo);
      if (idx === -1) {
        return { status: 404, statusText: 'Not Found', data: { erro: 'cliente não encontrado' } };
      }
      clientes[idx].ativo = (acao === 'reativar');
      this.saveClientes(clientes);
      return { status: 204, statusText: 'No Content', data: null };
    }

    // 5. GET ou PATCH /clientes/{codigo}
    const matchCodigo = pathname.match(/^\/clientes\/([^/]+)$/);
    if (matchCodigo) {
      const codigo = decodeURIComponent(matchCodigo[1]);
      const incluirInativos = params.get('incluir_inativos') === 'true';
      const idx = clientes.findIndex(c => c.codigo === codigo);

      if (method === 'GET') {
        if (idx === -1 || (!clientes[idx].ativo && !incluirInativos)) {
          return { status: 404, statusText: 'Not Found', data: { erro: 'cliente não encontrado' } };
        }
        return { status: 200, statusText: 'OK', data: clientes[idx] };
      }

      if (method === 'PATCH') {
        if (idx === -1) {
          return { status: 404, statusText: 'Not Found', data: { erro: 'cliente não encontrado' } };
        }
        const msgErro = this.validarAtualizacao(body);
        if (msgErro) {
          return { status: 400, statusText: 'Bad Request', data: { erro: msgErro } };
        }
        if (body.telefone !== null && body.telefone !== undefined) {
          clientes[idx].telefone = String(body.telefone);
        }
        if (body.cidade !== null && body.cidade !== undefined) {
          clientes[idx].cidade = String(body.cidade).trim();
        }
        this.saveClientes(clientes);
        return { status: 200, statusText: 'OK', data: clientes[idx] };
      }
    }

    return { status: 404, statusText: 'Not Found', data: { erro: 'rota não encontrada' } };
  }
};

// =====================================================================
// 3. CLIENTE HTTP UNIFICADO (API Real + Fallback + Inspector Logs)
// =====================================================================
async function apiRequest(method, path, body = null) {
  const startTime = performance.now();
  let result = null;
  let simulated = false;

  const tryRealApi = state.operationMode === 'api' || state.operationMode === 'auto';

  if (tryRealApi) {
    try {
      const options = {
        method,
        headers: { 'Accept': 'application/json' }
      };
      if (body !== null) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
      }

      const response = await fetch(`${state.apiBaseUrl}${path}`, options);
      let data = null;
      const text = await response.text();
      if (text) {
        try {
          data = JSON.parse(text);
        } catch (_) {
          data = { raw: text };
        }
      }

      result = {
        status: response.status,
        statusText: getHttpStatusLabel(response.status),
        data
      };
      state.usingSimulator = false;
    } catch (networkErr) {
      if (state.operationMode === 'api') {
        const elapsed = Math.round(performance.now() - startTime);
        const errRes = {
          status: 503,
          statusText: 'Service Unavailable',
          data: { erro: `Não foi possível conectar em ${state.apiBaseUrl}` }
        };
        recordApiLog(method, path, body, errRes, elapsed, false);
        updateConnectionUI();
        return errRes;
      }
      // Fallback automático para o simulador local se modo = 'auto'
      simulated = true;
      state.usingSimulator = true;
      result = LocalSimulator.handleRequest(method, path, body);
    }
  } else {
    simulated = true;
    state.usingSimulator = true;
    result = LocalSimulator.handleRequest(method, path, body);
  }

  const elapsed = Math.round(performance.now() - startTime);
  recordApiLog(method, path, body, result, elapsed, simulated);
  updateConnectionUI();
  return result;
}

function getHttpStatusLabel(status) {
  const map = {
    200: 'OK',
    201: 'Created',
    204: 'No Content',
    400: 'Bad Request',
    404: 'Not Found',
    409: 'Conflict',
    500: 'Internal Server Error',
    503: 'Service Unavailable'
  };
  return map[status] || '';
}

function getHttpBadgeClass(status) {
  if (status >= 200 && status < 300) return 'http-2xx';
  if (status === 400) return 'http-400';
  if (status === 404) return 'http-404';
  return 'http-409';
}

function recordApiLog(method, path, reqBody, res, elapsedMs, simulated) {
  const entry = {
    id: Date.now() + Math.random(),
    timestamp: new Date().toLocaleTimeString('pt-BR'),
    method,
    path,
    reqBody,
    status: res.status,
    statusText: res.statusText,
    resData: res.data,
    elapsedMs,
    simulated
  };
  state.apiLogs.unshift(entry);
  if (state.apiLogs.length > 40) state.apiLogs.pop();

  // Atualiza KPI de Última Resposta HTTP
  const badgeEl = document.getElementById('kpiHttpBadge');
  const endpointEl = document.getElementById('kpiLastEndpoint');
  const timingEl = document.getElementById('kpiLastTiming');
  const countEl = document.getElementById('apiLogCount');

  if (badgeEl) {
    badgeEl.className = `http-badge mono ${getHttpBadgeClass(res.status)}`;
    badgeEl.textContent = `${res.status} ${res.statusText}`;
  }
  if (endpointEl) {
    endpointEl.textContent = `${method} ${path}`;
    endpointEl.title = `${method} ${path}`;
  }
  if (timingEl) {
    const originLabel = simulated ? 'Simulador Local' : 'API Spring Boot';
    timingEl.textContent = `${originLabel} • ${elapsedMs} ms`;
  }
  if (countEl) {
    countEl.textContent = String(state.apiLogs.length);
  }

  renderApiLogDrawer();
}

// =====================================================================
// 4. OPERAÇÕES DE NEGÓCIO (BUSCA, CADASTRO, EDIÇÃO, INATIVAÇÃO)
// =====================================================================

async function carregarClientes() {
  const rawTerm = state.searchTerm.trim();

  // Detecção inteligente: se o usuário digitou um código no formato CLI-XXXX mesmo estando na aba Nome,
  // ou se está explicitamente no modo 'codigo' com texto preenchido
  const isCodePattern = /^CLI-\d+$/i.test(rawTerm);
  const usarBuscaPorCodigo = (state.searchMode === 'codigo' && rawTerm.length > 0) || isCodePattern;

  if (usarBuscaPorCodigo) {
    const codigoFormatado = rawTerm.toUpperCase();
    const query = state.incluirInativos ? '?incluir_inativos=true' : '';
    const path = `/clientes/${encodeURIComponent(codigoFormatado)}${query}`;

    updateActiveQueryBar('GET', path, 'Busca por Código Exato (RF2)');
    const res = await apiRequest('GET', path);

    if (res.status === 200 && res.data) {
      state.clientes = [res.data];
      state.pagina = 1;
      state.totalPaginas = 1;
      state.totalElementos = 1;
      state.lastErrorStatus = null;
      state.lastErrorMessage = null;
    } else {
      state.clientes = [];
      state.pagina = 1;
      state.totalPaginas = 0;
      state.totalElementos = 0;
      state.lastErrorStatus = res.status;
      state.lastErrorMessage = res.data?.erro || 'cliente não encontrado';
    }
    renderizarTabela();
    atualizarKPIs('Busca por Código Exato', path);
    return;
  }

  // Busca padrão paginada por parte do nome (GET /clientes?nome=...&incluir_inativos=...&pagina=...)
  const params = new URLSearchParams();
  params.set('nome', rawTerm);
  params.set('incluir_inativos', String(state.incluirInativos));
  params.set('pagina', String(state.pagina));

  const path = `/clientes?${params.toString()}`;
  const modoLabel = rawTerm ? `Filtro Nome: "${rawTerm}"` : 'Listagem por Nome (A–Z)';

  updateActiveQueryBar('GET', path, modoLabel);
  const res = await apiRequest('GET', path);

  if (res.status === 200 && res.data) {
    state.clientes = res.data.conteudo || [];
    state.pagina = res.data.pagina || 1;
    state.totalPaginas = res.data.totalPaginas || 0;
    state.totalElementos = res.data.totalElementos || 0;
    state.lastErrorStatus = null;
    state.lastErrorMessage = null;
  } else {
    state.clientes = [];
    state.totalPaginas = 0;
    state.totalElementos = 0;
    state.lastErrorStatus = res.status;
    state.lastErrorMessage = res.data?.erro || 'Erro ao consultar clientes';
  }

  renderizarTabela();
  atualizarKPIs(modoLabel, path);
}

async function verificarHealth() {
  const res = await apiRequest('GET', '/health');
  if (res.status === 200 && res.data) {
    state.healthData = res.data;
  } else {
    // Caso o backend Spring Boot esteja rodando sem o endpoint /health compilado ainda,
    // testamos GET /clientes?pagina=1 para confirmar se o backend + PostgreSQL estão online
    const fallbackCheck = await apiRequest('GET', '/clientes?pagina=1');
    if (fallbackCheck.status === 200) {
      state.healthData = {
        status: 'ok',
        banco: 'conectado',
        iniciado_em: state.healthData?.iniciado_em || new Date().toISOString()
      };
    } else {
      state.healthData = res.data || { status: 'indisponível', banco: 'desconectado' };
    }
  }
  updateConnectionUI();
  renderHealthModal();
}

async function alterarStatusAtivo(codigo, nome, ativar) {
  const acao = ativar ? 'reativar' : 'inativar';
  const path = `/clientes/${encodeURIComponent(codigo)}/${acao}`;
  const res = await apiRequest('PATCH', path);

  if (res.status === 204 || res.status === 200) {
    showToast(
      'success',
      `204 No Content — Cliente ${ativar ? 'reativado' : 'inativado'}`,
      `${nome} (${codigo}) foi ${ativar ? 'reativado na carteira' : 'inativado sem exclusão física'}.`
    );
    await carregarClientes();
  } else {
    showToast(
      'error',
      `${res.status} ${res.statusText}`,
      res.data?.erro || `Não foi possível ${acao} o cliente.`
    );
  }
}

// =====================================================================
// 5. RENDERIZAÇÃO DA INTERFACE (TABELA, PAGINAÇÃO, KPIS, MODAIS)
// =====================================================================

const AVATAR_COLORS = [
  { bg: '#eff6ff', text: '#1d4ed8' },
  { bg: '#ecfdf5', text: '#047857' },
  { bg: '#f5f3ff', text: '#6d28d9' },
  { bg: '#fffbeb', text: '#b45309' },
  { bg: '#fdf2f8', text: '#be185d' },
  { bg: '#ecfeff', text: '#0e7490' }
];

function getInitials(name) {
  const parts = String(name || '').trim().split(/\s+/);
  if (parts.length === 0) return 'CL';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getAvatarStyle(codigo) {
  let sum = 0;
  for (let i = 0; i < String(codigo).length; i++) {
    sum += String(codigo).charCodeAt(i);
  }
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function highlightMatch(text, term) {
  const safeText = escapeHtml(text);
  const cleanTerm = String(term || '').trim();
  if (!cleanTerm || state.searchMode === 'codigo' || /^CLI-\d+$/i.test(cleanTerm)) {
    return safeText;
  }
  const escapedTerm = cleanTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedTerm})`, 'gi');
  return safeText.replace(regex, '<mark class="search-highlight">$1</mark>');
}

function formatarTelefoneExibicao(telefone, codigo) {
  const tel = String(telefone || '');
  if (!state.mascararTelefone || state.revealedPhones.has(codigo)) {
    return `<span class="mono">${escapeHtml(tel)}</span>`;
  }
  // Mascara mantendo DDD e os 4 últimos dígitos: (81) 9••••-0007
  const mascarado = tel.replace(/(\d{1,2})\d{3,4}(-?\d{4})$/, '$1••••$2');
  return `<span class="phone-masked mono" data-reveal-phone="${escapeHtml(codigo)}" title="Clique para revelar o telefone">${escapeHtml(mascarado)} 👁️</span>`;
}

function formatarDataCriacao(isoStr) {
  if (!isoStr) return 'Recente';
  try {
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return String(isoStr).substring(0, 10);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch (_) {
    return 'Recente';
  }
}

function renderizarTabela() {
  const tbody = document.getElementById('tabelaClientesBody');
  const emptyState = document.getElementById('emptyState');
  const paginationFooter = document.getElementById('paginationFooter');

  if (!state.clientes || state.clientes.length === 0) {
    tbody.innerHTML = '';
    emptyState.classList.remove('hidden');
    paginationFooter.classList.add('hidden');

    const emptyBadge = document.getElementById('emptyHttpBadge');
    const emptyTitle = document.getElementById('emptyStateTitle');
    const emptyDesc = document.getElementById('emptyStateDesc');
    const btnToggleInativos = document.getElementById('btnEmptyToggleInativos');

    if (state.lastErrorStatus === 404) {
      emptyBadge.classList.remove('hidden');
      emptyBadge.textContent = '404 Not Found';
      emptyTitle.textContent = `Cliente não encontrado (${state.searchTerm.toUpperCase()})`;
      emptyDesc.textContent = `O servidor respondeu HTTP 404: "${state.lastErrorMessage}". Se o cliente estiver inativo, ative a opção "Incluir inativos".`;
    } else {
      emptyBadge.classList.add('hidden');
      emptyTitle.textContent = 'Nenhum cliente encontrado para este filtro';
      emptyDesc.textContent = state.incluirInativos
        ? 'Não há clientes ativos ou inativos que correspondam ao termo pesquisado.'
        : 'A busca padrão exibe apenas clientes ativos (RF4). Você pode incluir clientes inativos na consulta.';
    }

    if (!state.incluirInativos) {
      btnToggleInativos.classList.remove('hidden');
    } else {
      btnToggleInativos.classList.add('hidden');
    }
    return;
  }

  emptyState.classList.add('hidden');
  paginationFooter.classList.remove('hidden');

  const offsetBase = (state.pagina - 1) * 10;

  tbody.innerHTML = state.clientes.map((c, idx) => {
    const pos = offsetBase + idx + 1;
    const avatar = getAvatarStyle(c.codigo);
    const initials = getInitials(c.nome);
    const rowClass = c.ativo ? '' : 'row-inactive';

    const statusBadge = c.ativo
      ? `<span class="status-badge status-badge-ativo"><span class="status-badge-dot"></span>Ativo</span>`
      : `<span class="status-badge status-badge-inativo"><span class="status-badge-dot"></span>Inativo</span>`;

    const toggleStatusBtn = c.ativo
      ? `<button type="button" class="action-btn action-btn-inativar" data-action="inativar" data-codigo="${escapeHtml(c.codigo)}" data-nome="${escapeHtml(c.nome)}" title="RF4: Inativar cliente (exclusão lógica)">
             Inativar
           </button>`
      : `<button type="button" class="action-btn action-btn-reativar" data-action="reativar" data-codigo="${escapeHtml(c.codigo)}" data-nome="${escapeHtml(c.nome)}" title="RF4: Reativar cliente na carteira">
             Reativar
           </button>`;

    return `
        <tr class="${rowClass}">
          <td class="col-ord mono">#${pos}</td>
          <td class="col-codigo">
            <button type="button" class="badge-code" data-copy-code="${escapeHtml(c.codigo)}" title="Clique para filtrar ou copiar ${escapeHtml(c.codigo)}">
              ${escapeHtml(c.codigo)}
            </button>
          </td>
          <td class="col-nome">
            <div class="client-cell">
              <div class="client-avatar" style="background:${avatar.bg};color:${avatar.text}">
                ${escapeHtml(initials)}
              </div>
              <div class="client-info">
                <span class="client-name">${highlightMatch(c.nome, state.searchTerm)}</span>
                <span class="client-meta">Cadastrado em ${formatarDataCriacao(c.criadoEm)}</span>
              </div>
            </div>
          </td>
          <td class="col-email">
            <span class="email-cell mono">${escapeHtml(c.email)}</span>
          </td>
          <td class="col-telefone">
            <div class="phone-cell">
              ${formatarTelefoneExibicao(c.telefone, c.codigo)}
            </div>
          </td>
          <td class="col-cidade">
            <span class="city-badge">${escapeHtml(c.cidade)}</span>
          </td>
          <td class="col-status">
            ${statusBadge}
          </td>
          <td class="col-acoes text-right">
            <div class="row-actions">
              <button
                type="button"
                class="action-btn"
                data-action="editar"
                data-codigo="${escapeHtml(c.codigo)}"
                data-nome="${escapeHtml(c.nome)}"
                data-email="${escapeHtml(c.email)}"
                data-telefone="${escapeHtml(c.telefone)}"
                data-cidade="${escapeHtml(c.cidade)}"
                title="RF3: Editar telefone e cidade"
              >
                Editar
              </button>
              ${toggleStatusBtn}
            </div>
          </td>
        </tr>
      `;
  }).join('');

  renderizarPaginacao();
}

function renderizarPaginacao() {
  const summaryEl = document.getElementById('paginationSummary');
  const prevBtn = document.getElementById('btnPrevPage');
  const nextBtn = document.getElementById('btnNextPage');
  const pageNumbersEl = document.getElementById('pageNumbers');

  const total = state.totalElementos;
  const pagAtual = state.pagina;
  const totalPags = Math.max(state.totalPaginas, 1);

  const inicio = total === 0 ? 0 : (pagAtual - 1) * 10 + 1;
  const fim = Math.min(inicio + state.clientes.length - 1, total);

  summaryEl.innerHTML = `Exibindo <strong>${inicio}–${fim}</strong> de <strong>${total}</strong> cliente${total === 1 ? '' : 's'} (Página <strong>${pagAtual}</strong> de <strong>${totalPags}</strong>)`;

  prevBtn.disabled = pagAtual <= 1;
  nextBtn.disabled = pagAtual >= totalPags;

  const botoes = [];
  for (let p = 1; p <= totalPags; p++) {
    if (totalPags <= 7 || p === 1 || p === totalPags || Math.abs(p - pagAtual) <= 1) {
      botoes.push(`
          <button type="button" class="page-num mono ${p === pagAtual ? 'active' : ''}" data-page="${p}">
            ${p}
          </button>
        `);
    } else if (botoes[botoes.length - 1] !== '<span class="page-ellipsis">…</span>') {
      botoes.push('<span class="page-ellipsis">…</span>');
    }
  }
  pageNumbersEl.innerHTML = botoes.join('');
}

function atualizarKPIs(modoLabel, rotaAtiva) {
  const totalEl = document.getElementById('kpiTotalElementos');
  const filtroStatusEl = document.getElementById('kpiFiltroStatus');
  const modoBuscaEl = document.getElementById('kpiModoBusca');
  const rotaAtivaEl = document.getElementById('kpiRotaAtiva');
  const paginaAtualEl = document.getElementById('kpiPaginaAtual');
  const intervaloEl = document.getElementById('kpiIntervaloItens');

  totalEl.textContent = String(state.totalElementos);
  filtroStatusEl.textContent = state.incluirInativos
    ? 'Incluindo ativos e inativos (?incluir_inativos=true)'
    : 'Apenas clientes ativos (padrão RF4)';

  modoBuscaEl.textContent = modoLabel;
  rotaAtivaEl.textContent = `GET ${rotaAtiva}`;
  rotaAtivaEl.title = `GET ${rotaAtiva}`;

  const totalPags = Math.max(state.totalPaginas, 1);
  paginaAtualEl.textContent = `${state.pagina} / ${totalPags}`;

  if (state.clientes.length > 0) {
    const ini = (state.pagina - 1) * 10 + 1;
    const fim = ini + state.clientes.length - 1;
    intervaloEl.textContent = `Itens #${ini} a #${fim} (10 por página)`;
  } else {
    intervaloEl.textContent = 'Nenhum item na página';
  }
}

function updateActiveQueryBar(method, path) {
  document.getElementById('queryMethodBadge').textContent = method;
  document.getElementById('queryUrlText').textContent = path;
}

function updateConnectionUI() {
  const dot = document.getElementById('healthDot');
  const modeLabel = document.getElementById('healthModeLabel');
  const startedLabel = document.getElementById('healthStartedLabel');
  const simBanner = document.getElementById('simulationBanner');
  const simBannerUrl = document.getElementById('simBannerUrl');

  if (simBannerUrl) simBannerUrl.textContent = state.apiBaseUrl;

  if (state.usingSimulator) {
    dot.className = 'status-dot status-sim';
    modeLabel.textContent = 'Simulador Local (Seed 56)';
    const started = LocalSimulator.getIniciadoEm().substring(0, 19).replace('T', ' ');
    startedLabel.textContent = `iniciado_em: ${started}`;
    simBanner.classList.remove('hidden');
  } else {
    dot.className = 'status-dot status-online';
    modeLabel.textContent = 'API Online • PostgreSQL';
    const rawStarted = state.healthData?.iniciado_em || 'conectado';
    const cleanStarted = String(rawStarted).substring(0, 19).replace('T', ' ');
    startedLabel.textContent = `iniciado_em: ${cleanStarted}`;
    simBanner.classList.add('hidden');
  }
}

function renderHealthModal() {
  const pre = document.getElementById('healthJsonPre');
  const metaIniciado = document.getElementById('healthMetaIniciado');
  const metaBanco = document.getElementById('healthMetaBanco');
  const metaAgora = document.getElementById('healthMetaAgora');
  const badge = document.getElementById('healthModalBadge');

  const payload = state.usingSimulator
    ? {
      iniciado_em: LocalSimulator.getIniciadoEm(),
      status: 'ok',
      banco: 'simulador local (56 clientes V2__seed.sql)',
      endpoint_configurado: state.apiBaseUrl
    }
    : (state.healthData || { status: 'ok', banco: 'conectado', iniciado_em: new Date().toISOString() });

  pre.textContent = JSON.stringify(payload, null, 2);
  metaIniciado.textContent = payload.iniciado_em || '--';
  metaBanco.textContent = payload.banco || 'conectado';
  metaAgora.textContent = new Date().toLocaleString('pt-BR');

  badge.className = `http-badge mono ${payload.status === 'ok' ? 'http-2xx' : 'http-409'}`;
  badge.textContent = payload.status === 'ok' ? '200 OK' : '503 Unavailable';

  document.getElementById('inputApiBaseUrl').value = state.apiBaseUrl;
  document.getElementById('selectOperationMode').value = state.operationMode;
}

function renderApiLogDrawer() {
  const listEl = document.getElementById('apiLogList');
  if (!listEl) return;

  if (state.apiLogs.length === 0) {
    listEl.innerHTML = `<p class="section-desc">Nenhuma requisição registrada ainda.</p>`;
    return;
  }

  listEl.innerHTML = state.apiLogs.map(log => {
    const badgeClass = getHttpBadgeClass(log.status);
    const reqStr = log.reqBody ? `\n// Request Body:\n${JSON.stringify(log.reqBody, null, 2)}\n` : '';
    const resStr = log.resData ? JSON.stringify(log.resData, null, 2) : '(204 Sem Corpo)';

    return `
        <div class="log-entry">
          <div class="log-entry-top">
            <div class="log-entry-route mono">
              <span class="query-method">${escapeHtml(log.method)}</span>
              <span>${escapeHtml(log.path)}</span>
            </div>
            <span class="http-badge mono ${badgeClass}">${log.status} ${escapeHtml(log.statusText)}</span>
          </div>
          <div class="client-meta mono">
            Horário: ${escapeHtml(log.timestamp)} • Latência: ${log.elapsedMs} ms • ${log.simulated ? 'Simulador' : 'API Real'}
          </div>
          <pre class="log-entry-pre mono">${escapeHtml(reqStr + resStr)}</pre>
        </div>
      `;
  }).join('');
}

// =====================================================================
// 6. TOAST NOTIFICATIONS & MODAIS
// =====================================================================
function showToast(type, title, message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
      <div class="toast-top">
        <span class="toast-title">${escapeHtml(title)}</span>
      </div>
      <div class="toast-msg">${escapeHtml(message)}</div>
    `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.2s ease';
    setTimeout(() => toast.remove(), 220);
  }, 4200);
}

function openModal(id) {
  document.getElementById(id)?.classList.remove('hidden');
}

function closeModal(id) {
  document.getElementById(id)?.classList.add('hidden');
}

function showInlineAlert(prefix, status, statusText, route, message) {
  const box = document.getElementById(`${prefix}Alert`);
  const badge = document.getElementById(`${prefix}AlertStatus`);
  const routeEl = document.getElementById(`${prefix}AlertRoute`);
  const msgEl = document.getElementById(`${prefix}AlertMsg`);

  box.classList.remove('hidden');
  badge.className = `http-badge mono ${getHttpBadgeClass(status)}`;
  badge.textContent = `${status} ${statusText}`;
  if (routeEl) routeEl.textContent = route;
  msgEl.textContent = JSON.stringify({ erro: message });
}

function hideInlineAlert(prefix) {
  document.getElementById(`${prefix}Alert`)?.classList.add('hidden');
}

// =====================================================================
// 7. EVENT LISTENERS E ATALHOS DE DEMONSTRAÇÃO (CA1–CA5)
// =====================================================================
function setupEventListeners() {
  // Relógio ao vivo no topo (para evidências com data e hora visíveis)
  const updateClock = () => {
    const el = document.getElementById('liveClock');
    if (el) {
      el.textContent = new Date().toLocaleString('pt-BR');
    }
  };
  updateClock();
  setInterval(updateClock, 1000);

  // Alternar abas de modo de busca (Nome vs Código Exato)
  const tabNome = document.getElementById('tabBuscaNome');
  const tabCodigo = document.getElementById('tabBuscaCodigo');
  const inputBusca = document.getElementById('inputBusca');
  const btnLimparBusca = document.getElementById('btnLimparBusca');

  function setSearchMode(mode) {
    state.searchMode = mode;
    if (mode === 'nome') {
      tabNome.classList.add('active');
      tabNome.setAttribute('aria-selected', 'true');
      tabCodigo.classList.remove('active');
      tabCodigo.setAttribute('aria-selected', 'false');
      inputBusca.placeholder = 'Buscar por parte do nome (ex: silva, Ana, Oliveira)...';
    } else {
      tabCodigo.classList.add('active');
      tabCodigo.setAttribute('aria-selected', 'true');
      tabNome.classList.remove('active');
      tabNome.setAttribute('aria-selected', 'false');
      inputBusca.placeholder = 'Digite o código exato do cliente (ex: CLI-0007)...';
    }
  }

  tabNome.addEventListener('click', () => {
    setSearchMode('nome');
    state.pagina = 1;
    carregarClientes();
  });

  tabCodigo.addEventListener('click', () => {
    setSearchMode('codigo');
    inputBusca.focus();
    if (state.searchTerm.trim()) {
      carregarClientes();
    }
  });

  // Busca com debounce ao digitar no modo Nome
  let debounceTimer = null;
  inputBusca.addEventListener('input', (e) => {
    state.searchTerm = e.target.value;
    btnLimparBusca.classList.toggle('hidden', !state.searchTerm);

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      state.pagina = 1;
      carregarClientes();
    }, 240);
  });

  document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    clearTimeout(debounceTimer);
    state.searchTerm = inputBusca.value;
    state.pagina = 1;
    carregarClientes();
  });

  btnLimparBusca.addEventListener('click', () => {
    inputBusca.value = '';
    state.searchTerm = '';
    btnLimparBusca.classList.add('hidden');
    setSearchMode('nome');
    state.pagina = 1;
    carregarClientes();
  });

  // Toggles: Incluir Inativos & Mascarar Telefone
  const chkInativos = document.getElementById('chkIncluirInativos');
  chkInativos.addEventListener('change', (e) => {
    state.incluirInativos = e.target.checked;
    state.pagina = 1;
    carregarClientes();
  });

  const chkMascarar = document.getElementById('chkMascararTelefone');
  chkMascarar.addEventListener('change', (e) => {
    state.mascararTelefone = e.target.checked;
    state.revealedPhones.clear();
    renderizarTabela();
  });

  // Paginação
  document.getElementById('btnPrevPage').addEventListener('click', () => {
    if (state.pagina > 1) {
      state.pagina--;
      carregarClientes();
    }
  });

  document.getElementById('btnNextPage').addEventListener('click', () => {
    if (state.pagina < state.totalPaginas) {
      state.pagina++;
      carregarClientes();
    }
  });

  document.getElementById('pageNumbers').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-page]');
    if (!btn) return;
    const page = parseInt(btn.getAttribute('data-page'), 10);
    if (page && page !== state.pagina) {
      state.pagina = page;
      carregarClientes();
    }
  });

  // Ações na Tabela (Editar, Inativar, Reativar, Copiar Código, Revelar Telefone)
  document.getElementById('tabelaClientesBody').addEventListener('click', (e) => {
    const revealEl = e.target.closest('[data-reveal-phone]');
    if (revealEl) {
      const cod = revealEl.getAttribute('data-reveal-phone');
      state.revealedPhones.add(cod);
      renderizarTabela();
      return;
    }

    const codeBtn = e.target.closest('[data-copy-code]');
    if (codeBtn) {
      const codigo = codeBtn.getAttribute('data-copy-code');
      navigator.clipboard?.writeText(codigo).catch(() => { });
      setSearchMode('codigo');
      inputBusca.value = codigo;
      state.searchTerm = codigo;
      btnLimparBusca.classList.remove('hidden');
      carregarClientes();
      showToast('info', `Filtro por Código Exato: ${codigo}`, `Consultando GET /clientes/${codigo}`);
      return;
    }

    const actionBtn = e.target.closest('[data-action]');
    if (!actionBtn) return;

    const action = actionBtn.getAttribute('data-action');
    const codigo = actionBtn.getAttribute('data-codigo');
    const nome = actionBtn.getAttribute('data-nome');

    if (action === 'inativar') {
      alterarStatusAtivo(codigo, nome, false);
    } else if (action === 'reativar') {
      alterarStatusAtivo(codigo, nome, true);
    } else if (action === 'editar') {
      abrirModalEdicao({
        codigo,
        nome,
        email: actionBtn.getAttribute('data-email'),
        telefone: actionBtn.getAttribute('data-telefone'),
        cidade: actionBtn.getAttribute('data-cidade')
      });
    }
  });

  // Botões do Empty State
  document.getElementById('btnEmptyToggleInativos').addEventListener('click', () => {
    state.incluirInativos = true;
    chkInativos.checked = true;
    state.pagina = 1;
    carregarClientes();
  });

  document.getElementById('btnEmptyReset').addEventListener('click', () => {
    resetarFiltros();
  });

  document.getElementById('btnRefreshList').addEventListener('click', () => {
    carregarClientes();
  });

  // Atalhos de Demonstração (CA1 a CA5 + Persistência)
  document.querySelectorAll('[data-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      const preset = btn.getAttribute('data-preset');
      executarPresetDemonstracao(preset, setSearchMode);
    });
  });

  // Modal Novo Cliente (RF1)
  document.getElementById('btnNovoCliente').addEventListener('click', () => {
    hideInlineAlert('cadastro');
    document.getElementById('formCadastro').reset();
    openModal('modalCadastro');
    document.getElementById('cadNome').focus();
  });

  // Presets dentro do Modal de Cadastro
  document.getElementById('btnFillFicticio').addEventListener('click', () => {
    hideInlineAlert('cadastro');
    const nomes = ['Clara Mendonça', 'Breno Cavalcanti', 'Lorena Queiroz', 'Otávio Lins', 'Cecília Maia'];
    const cidades = ['Recife', 'Olinda', 'Paulista', 'Jaboatão dos Guararapes', 'Camaragibe'];
    const sorteado = nomes[Math.floor(Math.random() * nomes.length)];
    const slug = sorteado.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '.');
    const sufixo = Math.floor(100 + Math.random() * 899);

    document.getElementById('cadNome').value = sorteado;
    document.getElementById('cadEmail').value = `${slug}.${sufixo}@exemplo.com`;
    document.getElementById('cadTelefone').value = `(81) 90000-0${sufixo}`;
    document.getElementById('cadCidade').value = cidades[Math.floor(Math.random() * cidades.length)];
  });

  document.getElementById('btnFillPalavraDia').addEventListener('click', () => {
    hideInlineAlert('cadastro');
    document.getElementById('cadNome').value = 'G08-NIMBUS';
    document.getElementById('cadEmail').value = 'g08.nimbus@exemplo.com';
    document.getElementById('cadTelefone').value = '(81) 90000-0008';
    document.getElementById('cadCidade').value = 'Recife';
  });

  document.getElementById('btnFillErro409').addEventListener('click', () => {
    hideInlineAlert('cadastro');
    document.getElementById('cadNome').value = 'Teste Duplicidade CA3';
    document.getElementById('cadEmail').value = 'ana.silva@exemplo.com';
    document.getElementById('cadTelefone').value = '(81) 91111-1111';
    document.getElementById('cadCidade').value = 'Recife';
  });

  document.getElementById('btnFillErro400').addEventListener('click', () => {
    hideInlineAlert('cadastro');
    document.getElementById('cadNome').value = 'Teste Email Invalido CA3';
    document.getElementById('cadEmail').value = 'testeexemplo.com';
    document.getElementById('cadTelefone').value = '(81) 91111-1111';
    document.getElementById('cadCidade').value = 'Recife';
  });

  // Submissão do Cadastro (POST /clientes)
  document.getElementById('formCadastro').addEventListener('submit', async (e) => {
    e.preventDefault();
    hideInlineAlert('cadastro');

    const payload = {
      nome: document.getElementById('cadNome').value,
      email: document.getElementById('cadEmail').value,
      telefone: document.getElementById('cadTelefone').value,
      cidade: document.getElementById('cadCidade').value
    };

    const submitBtn = document.getElementById('btnSubmitCadastro');
    submitBtn.disabled = true;

    const res = await apiRequest('POST', '/clientes', payload);
    submitBtn.disabled = false;

    if (res.status === 201 && res.data) {
      closeModal('modalCadastro');
      showToast(
        'success',
        `201 Created — ${res.data.codigo} gerado!`,
        `Cliente "${res.data.nome}" cadastrado com sucesso.`
      );
      // Filtra pelo nome recém-criado para exibi-lo imediatamente na tela
      setSearchMode('nome');
      inputBusca.value = res.data.nome;
      state.searchTerm = res.data.nome;
      btnLimparBusca.classList.remove('hidden');
      state.pagina = 1;
      await carregarClientes();
    } else {
      showInlineAlert(
        'cadastro',
        res.status,
        res.statusText,
        'POST /clientes',
        res.data?.erro || 'Erro ao validar dados de cadastro'
      );
      showToast(
        'error',
        `HTTP ${res.status} (${res.statusText})`,
        res.data?.erro || 'Dados recusados pelo servidor.'
      );
    }
  });

  // Submissão de Edição (PATCH /clientes/{codigo})
  document.getElementById('formEditar').addEventListener('submit', async (e) => {
    e.preventDefault();
    hideInlineAlert('editar');

    const codigo = document.getElementById('editCodigoHidden').value;
    const payload = {
      telefone: document.getElementById('editTelefone').value,
      cidade: document.getElementById('editCidade').value
    };

    const path = `/clientes/${encodeURIComponent(codigo)}`;
    const res = await apiRequest('PATCH', path, payload);

    if (res.status === 200 && res.data) {
      closeModal('modalEditar');
      showToast(
        'success',
        `200 OK — Contato atualizado`,
        `Dados de ${res.data.nome} (${codigo}) atualizados.`
      );
      await carregarClientes();
    } else {
      showInlineAlert(
        'editar',
        res.status,
        res.statusText,
        `PATCH ${path}`,
        res.data?.erro || 'Falha na atualização'
      );
    }
  });

  // Modal Health & Configuração da API
  document.getElementById('btnHealthModal').addEventListener('click', () => {
    verificarHealth();
    openModal('modalHealth');
  });

  document.getElementById('btnConfigApiBanner').addEventListener('click', () => {
    verificarHealth();
    openModal('modalHealth');
  });

  document.getElementById('btnRetryApi').addEventListener('click', async () => {
    state.operationMode = 'auto';
    localStorage.setItem(STORAGE_KEYS.OP_MODE, 'auto');
    await verificarHealth();
    await carregarClientes();
    if (!state.usingSimulator) {
      showToast('success', 'Conectado ao Backend Real!', `API respondendo em ${state.apiBaseUrl}`);
    } else {
      showToast('warn', 'Backend ainda inacessível', `Mantendo Simulador Local ativo (${state.apiBaseUrl} offline).`);
    }
  });

  document.getElementById('btnRefreshHealth').addEventListener('click', () => {
    verificarHealth();
  });

  document.getElementById('btnSaveApiConfig').addEventListener('click', async () => {
    const rawUrl = document.getElementById('inputApiBaseUrl').value.trim().replace(/\/+$/, '');
    const mode = document.getElementById('selectOperationMode').value;

    state.apiBaseUrl = rawUrl || 'http://localhost:8080';
    state.operationMode = mode;

    localStorage.setItem(STORAGE_KEYS.API_URL, state.apiBaseUrl);
    localStorage.setItem(STORAGE_KEYS.OP_MODE, state.operationMode);

    await verificarHealth();
    await carregarClientes();
    closeModal('modalHealth');
    showToast('info', 'Configuração aplicada', `Modo: ${mode.toUpperCase()} • URL: ${state.apiBaseUrl}`);
  });

  document.getElementById('btnResetMockData').addEventListener('click', async () => {
    LocalSimulator.reset();
    await verificarHealth();
    await carregarClientes();
    showToast('success', 'Dados do Seed restaurados', 'Os 56 clientes originais (V2__seed.sql) foram recarregados no simulador.');
  });

  // Inspector HTTP Drawer
  const drawer = document.getElementById('drawerApiLog');
  document.getElementById('btnApiLog').addEventListener('click', () => {
    renderApiLogDrawer();
    drawer.classList.remove('hidden');
  });
  document.getElementById('kpiLastHttpCard').addEventListener('click', () => {
    renderApiLogDrawer();
    drawer.classList.remove('hidden');
  });
  document.getElementById('btnCloseDrawer').addEventListener('click', () => {
    drawer.classList.add('hidden');
  });
  document.getElementById('btnClearLogs').addEventListener('click', () => {
    state.apiLogs = [];
    document.getElementById('apiLogCount').textContent = '0';
    renderApiLogDrawer();
  });

  // Fechar modais no botão X ou clicando fora
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(btn.getAttribute('data-close-modal'));
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.add('hidden');
      }
    });
  });

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      drawer.classList.add('hidden');
    }
  });
}

function abrirModalEdicao(cliente) {
  hideInlineAlert('editar');
  document.getElementById('editCodigoHidden').value = cliente.codigo;
  document.getElementById('editEndpointPill').textContent = `PATCH /clientes/${cliente.codigo}`;
  document.getElementById('editCodigoDisplay').textContent = cliente.codigo;
  document.getElementById('editNomeDisplay').textContent = cliente.nome;
  document.getElementById('editEmailDisplay').textContent = cliente.email;
  document.getElementById('editTelefone').value = cliente.telefone;
  document.getElementById('editCidade').value = cliente.cidade;
  openModal('modalEditar');
  document.getElementById('editTelefone').focus();
}

function resetarFiltros() {
  const inputBusca = document.getElementById('inputBusca');
  const chkInativos = document.getElementById('chkIncluirInativos');
  const btnLimparBusca = document.getElementById('btnLimparBusca');

  inputBusca.value = '';
  state.searchTerm = '';
  state.incluirInativos = false;
  chkInativos.checked = false;
  state.pagina = 1;
  btnLimparBusca.classList.add('hidden');

  document.getElementById('tabBuscaNome').click();
}

function executarPresetDemonstracao(preset, setSearchMode) {
  const inputBusca = document.getElementById('inputBusca');
  const chkInativos = document.getElementById('chkIncluirInativos');
  const btnLimparBusca = document.getElementById('btnLimparBusca');

  if (preset === 'ca1') {
    // CA1: Buscar "silva" encontra Ana Silva, Jéssica da Silva, Roberto Silva e Silvana Costa
    setSearchMode('nome');
    inputBusca.value = 'silva';
    state.searchTerm = 'silva';
    state.incluirInativos = false;
    chkInativos.checked = false;
    state.pagina = 1;
    btnLimparBusca.classList.remove('hidden');
    carregarClientes();
    showToast('info', 'CA1: Busca por parte do nome ("silva")', 'Executando GET /clientes?nome=silva (sem diferenciar maiúsculas/minúsculas).');
  } else if (preset === 'ca2') {
    // CA2: Buscar código CLI-0007 retorna exatamente Ana Silva
    setSearchMode('codigo');
    inputBusca.value = 'CLI-0007';
    state.searchTerm = 'CLI-0007';
    btnLimparBusca.classList.remove('hidden');
    carregarClientes();
    showToast('info', 'CA2: Busca por código exato (CLI-0007)', 'Executando GET /clientes/CLI-0007.');
  } else if (preset === 'ca3') {
    // CA3: Testar 409 (e-mail repetido) e 400 (e-mail sem @)
    hideInlineAlert('cadastro');
    document.getElementById('btnFillErro409').click();
    openModal('modalCadastro');
    showToast('warn', 'CA3: Validação no Servidor (409 e 400)', 'Clique em "Cadastrar Cliente" para ver o erro 409 ou use o botão "CA3: E-mail sem @ (400)".');
  } else if (preset === 'ca4') {
    // CA4: Inativos com ?incluir_inativos=true
    setSearchMode('nome');
    inputBusca.value = '';
    state.searchTerm = '';
    state.incluirInativos = true;
    chkInativos.checked = true;
    state.pagina = 1;
    btnLimparBusca.classList.add('hidden');
    carregarClientes();
    showToast('info', 'CA4: Incluindo clientes inativos', 'Executando GET /clientes?incluir_inativos=true (veja Camila Rocha, Priscila Andrade, Wesley Cordeiro).');
  } else if (preset === 'ca5') {
    // CA5: Página 2 traz os clientes 11 a 20 da ordenação por nome
    setSearchMode('nome');
    inputBusca.value = '';
    state.searchTerm = '';
    state.incluirInativos = false;
    chkInativos.checked = false;
    state.pagina = 2;
    btnLimparBusca.classList.add('hidden');
    carregarClientes();
    showToast('info', 'CA5: Paginação 10 em 10 (Página 2)', 'Exibindo clientes #11 a #20 ordenados alfabeticamente por nome.');
  } else if (preset === 'persistencia') {
    hideInlineAlert('cadastro');
    document.getElementById('btnFillPalavraDia').click();
    openModal('modalCadastro');
  } else if (preset === 'reset') {
    resetarFiltros();
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
  setupEventListeners();
  await verificarHealth();
  await carregarClientes();
});
}) ();

