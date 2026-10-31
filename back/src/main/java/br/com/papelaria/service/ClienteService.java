package br.com.papelaria.service;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import br.com.papelaria.dto.ClienteRequest;
import br.com.papelaria.dto.ClienteResponse;
import br.com.papelaria.dto.ClienteUpdateRequest;
import br.com.papelaria.dto.PaginaResponse;
import br.com.papelaria.model.Cliente;
import br.com.papelaria.repository.ClienteRepository;

@Service
public class ClienteService {

    private static final int TAMANHO_PAGINA = 10;

    private final ClienteRepository repository;

    public ClienteService(ClienteRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public ClienteResponse cadastrar(ClienteRequest req) {
        String email = req.email().trim().toLowerCase();
        if (repository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "e-mail já cadastrado");
        }
        try {
            Cliente cliente = repository.saveAndFlush(
                    new Cliente(req.nome().trim(), email, req.telefone(), req.cidade()));
            return ClienteResponse.de(cliente);
        } catch (DataIntegrityViolationException e) {
            // Corrida entre duas requisições com o mesmo e-mail: a UNIQUE do banco decide
            throw new ResponseStatusException(HttpStatus.CONFLICT, "e-mail já cadastrado");
        }
    }

    @Transactional(readOnly = true)
    public PaginaResponse<ClienteResponse> buscar(String nome, boolean incluirInativos, int pagina) {
        if (pagina < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "pagina deve ser maior ou igual a 1");
        }
        Page<Cliente> page = repository.buscarPorNome(nome.trim(), incluirInativos,
                PageRequest.of(pagina - 1, TAMANHO_PAGINA));
        return new PaginaResponse<>(
                page.map(ClienteResponse::de).getContent(),
                pagina,
                page.getTotalPages(),
                page.getTotalElements());
    }

    @Transactional(readOnly = true)
    public ClienteResponse buscarPorCodigo(String codigo, boolean incluirInativos) {
        Cliente cliente = obter(codigo);
        if (!cliente.isAtivo() && !incluirInativos) {
            throw naoEncontrado();
        }
        return ClienteResponse.de(cliente);
    }

    @Transactional
    public ClienteResponse atualizar(String codigo, ClienteUpdateRequest req) {
        Cliente cliente = obter(codigo);
        cliente.setTelefone(req.telefone());
        cliente.setCidade(req.cidade());
        return ClienteResponse.de(cliente);
    }

    @Transactional
    public void alterarAtivo(String codigo, boolean ativo) {
        obter(codigo).setAtivo(ativo);
    }

    private Cliente obter(String codigo) {
        return repository.findByCodigo(codigo).orElseThrow(this::naoEncontrado);
    }

    private ResponseStatusException naoEncontrado() {
        return new ResponseStatusException(HttpStatus.NOT_FOUND, "cliente não encontrado");
    }
}
