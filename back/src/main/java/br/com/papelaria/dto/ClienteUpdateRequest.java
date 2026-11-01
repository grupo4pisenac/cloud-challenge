package br.com.papelaria.dto;

import jakarta.validation.constraints.Size;

public record ClienteUpdateRequest(
        @Size(max = 20, message = "telefone deve ter no máximo 20 caracteres") String telefone,
        @Size(max = 80, message = "cidade deve ter no máximo 80 caracteres") String cidade) {
}
