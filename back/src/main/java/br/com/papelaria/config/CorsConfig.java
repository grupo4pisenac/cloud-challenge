package br.com.papelaria.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${CORS_ALLOWED_ORIGINS:*}")
    private String corsAllowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String[] origins = Arrays.stream(corsAllowedOrigins.split(","))
                .map(String::trim)
                .filter(origin -> !origin.isEmpty())
                .toArray(String[]::new);

        registry.addMapping("/**")
                .allowedOriginPatterns(origins.length > 0 ? origins : new String[] { "*" })
                .allowedMethods("GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}
