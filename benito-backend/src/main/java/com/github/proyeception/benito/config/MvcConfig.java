package com.github.proyeception.benito.config;

import com.typesafe.config.Config;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@PropertySource({
    "classpath:application.properties",
    "classpath:sensitive.properties"
})
public class MvcConfig implements WebMvcConfigurer {
    private List<String> allowedOrigins;

    public MvcConfig(Config config) {
        this.allowedOrigins = config.getStringList("cors.origins");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/benito/**")
            .allowedMethods("GET", "POST", "PUT", "PATCH", "HEAD", "OPTIONS", "DELETE")
            .allowedOrigins(allowedOrigins.toArray(new String[0]))
            .allowCredentials(true);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/static/**");
        registry.addResourceHandler("/resources/static/");
        registry.addResourceHandler("/resources/templates/**");
        registry.addResourceHandler("/resources/templates/");
    }
}
