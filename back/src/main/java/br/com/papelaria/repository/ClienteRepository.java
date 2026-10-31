package br.com.papelaria.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.papelaria.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    Optional<Cliente> findByCodigo(String codigo);

    boolean existsByEmail(String email);

    @Query(value = """
            SELECT * FROM clientes
            WHERE nome ILIKE '%' || :nome || '%'
              AND (ativo = true OR :incluirInativos)
            ORDER BY nome, codigo
            """,
            countQuery = """
            SELECT count(*) FROM clientes
            WHERE nome ILIKE '%' || :nome || '%'
              AND (ativo = true OR :incluirInativos)
            """,
            nativeQuery = true)
    Page<Cliente> buscarPorNome(@Param("nome") String nome,
                                @Param("incluirInativos") boolean incluirInativos,
                                Pageable pageable);
}
