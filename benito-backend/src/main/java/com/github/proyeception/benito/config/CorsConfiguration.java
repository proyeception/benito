package com.github.proyeception.benito.config;

import com.typesafe.config.Config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class CorsConfiguration implements WebMvcConfigurer {
    private List<String> allowedOrigins;

    public CorsConfiguration(Config config) {
        this.allowedOrigins = config.getStringList("cors.origins");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedMethods("GET", "POST", "PUT", "PATCH", "HEAD", "OPTIONS", "DELETE")
            .allowedOrigins(allowedOrigins.toArray(new String[0]))
            .allowCredentials(true);
    }
}
