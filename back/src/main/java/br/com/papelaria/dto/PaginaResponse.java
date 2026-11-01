package br.com.papelaria.dto;

import java.util.List;

public record PaginaResponse<T>(
        List<T> conteudo,
        int pagina,
        int totalPaginas,
        long totalElementos) {
}
