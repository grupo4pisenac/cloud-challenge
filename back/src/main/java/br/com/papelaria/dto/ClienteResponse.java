package br.com.papelaria.dto;

import java.time.LocalDateTime;

import br.com.papelaria.model.Cliente;

public record ClienteResponse(
        String codigo,
        String nome,
        String email,
        String telefone,
        String cidade,
        boolean ativo,
        LocalDateTime criadoEm) {

    public static ClienteResponse de(Cliente c) {
        return new ClienteResponse(c.getCodigo(), c.getNome(), c.getEmail(),
                c.getTelefone(), c.getCidade(), c.isAtivo(), c.getCriadoEm());
    }
}
