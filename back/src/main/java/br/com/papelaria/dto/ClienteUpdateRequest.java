package br.com.papelaria.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

// Campos opcionais: o que não for enviado (null) mantém o valor atual
public record ClienteUpdateRequest(
        @Pattern(regexp = "^[0-9+() -]{8,20}$", message = "telefone inválido")
        String telefone,

        @Pattern(regexp = ".*\\S.*", message = "cidade não pode ser vazia")
        @Size(max = 80, message = "cidade deve ter no máximo 80 caracteres")
        String cidade) {
}
