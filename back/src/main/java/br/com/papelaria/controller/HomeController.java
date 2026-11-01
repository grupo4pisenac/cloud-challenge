package br.com.papelaria.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    // A raiz abre direto o Swagger UI
    @GetMapping("/")
    public String home() {
        return "redirect:/swagger-ui.html";
    }
}
