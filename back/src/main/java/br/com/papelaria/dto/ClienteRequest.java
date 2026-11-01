package br.com.papelaria.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ClienteRequest(
        @NotBlank(message = "nome é obrigatório") @Size(max = 120, message = "nome deve ter no máximo 120 caracteres") String nome,
        @NotBlank(message = "email é obrigatório") @Email(message = "email inválido") @Size(max = 150, message = "email deve ter no máximo 150 caracteres") String email,
        @Size(max = 20, message = "telefone deve ter no máximo 20 caracteres") String telefone,
        @Size(max = 80, message = "cidade deve ter no máximo 80 caracteres") String cidade) {
}
