package br.com.papelaria.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    // A raiz abre a interface web (Carteira de Clientes)
    @GetMapping("/")
    public String home() {
        return "forward:/index.html";
    }

    // Atalho opcional para o Swagger UI
    @GetMapping("/swagger")
    public String swagger() {
        return "redirect:/swagger-ui.html";
    }
}
