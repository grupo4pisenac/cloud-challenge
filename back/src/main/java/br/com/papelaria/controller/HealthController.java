package br.com.papelaria.controller;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    private static final OffsetDateTime INICIADO_EM = OffsetDateTime.now(ZoneOffset.ofHours(-3));

    private final JdbcTemplate jdbcTemplate;

    public HealthController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("iniciado_em", INICIADO_EM.toString());
        try {
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            body.put("status", "ok");
            body.put("banco", "conectado");
            return ResponseEntity.ok(body);
        } catch (Exception e) {
            body.put("status", "erro");
            body.put("banco", "indisponível");
            body.put("erro", "falha na conexão com o banco de dados");
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(body);
        }
    }
}

