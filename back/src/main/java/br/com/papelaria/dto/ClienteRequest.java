package br.com.papelaria.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

// As regras espelham os CHECKs da tabela (V1__criar_tabela.sql), pra responder 400 antes de chegar no banco
public record ClienteRequest(
        @NotBlank(message = "nome é obrigatório")
        @Size(max = 120, message = "nome deve ter no máximo 120 caracteres")
        String nome,

        @NotBlank(message = "email é obrigatório")
        @Email(message = "email inválido")
        @Pattern(regexp = "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$", message = "email inválido")
        @Size(max = 254, message = "email deve ter no máximo 254 caracteres")
        String email,

        @NotBlank(message = "telefone é obrigatório")
        @Pattern(regexp = "^[0-9+() -]{8,20}$", message = "telefone inválido")
        String telefone,

        @NotBlank(message = "cidade é obrigatória")
        @Size(max = 80, message = "cidade deve ter no máximo 80 caracteres")
        String cidade) {
}
