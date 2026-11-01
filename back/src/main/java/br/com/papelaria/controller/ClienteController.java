package br.com.papelaria.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.papelaria.dto.ClienteRequest;
import br.com.papelaria.dto.ClienteResponse;
import br.com.papelaria.dto.ClienteUpdateRequest;
import br.com.papelaria.dto.PaginaResponse;
import br.com.papelaria.service.ClienteService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    private final ClienteService service;

    public ClienteController(ClienteService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ClienteResponse cadastrar(@RequestBody @Valid ClienteRequest req) {
        return service.cadastrar(req);
    }

    @GetMapping
    public PaginaResponse<ClienteResponse> buscar(
            @RequestParam(defaultValue = "") String nome,
            @RequestParam(name = "incluir_inativos", defaultValue = "false") boolean incluirInativos,
            @RequestParam(defaultValue = "1") int pagina) {
        return service.buscar(nome, incluirInativos, pagina);
    }

    @GetMapping("/{codigo}")
    public ClienteResponse buscarPorCodigo(
            @PathVariable String codigo,
            @RequestParam(name = "incluir_inativos", defaultValue = "false") boolean incluirInativos) {
        return service.buscarPorCodigo(codigo, incluirInativos);
    }

    @PatchMapping("/{codigo}")
    public ClienteResponse atualizar(@PathVariable String codigo, @RequestBody @Valid ClienteUpdateRequest req) {
        return service.atualizar(codigo, req);
    }

    @PatchMapping("/{codigo}/inativar")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void inativar(@PathVariable String codigo) {
        service.alterarAtivo(codigo, false);
    }

    @PatchMapping("/{codigo}/reativar")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void reativar(@PathVariable String codigo) {
        service.alterarAtivo(codigo, true);
    }
}
