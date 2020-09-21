package com.github.proyeception.benito.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Import({
    ClientModule.class,
    ConfigModule.class,
    ConnectionModule.class,
    CorsConfiguration.class,
    OAuthModule.class,
    ObjectMapperModule.class,
    ParserModule.class,
    ServiceModule.class,
    SnapshotModule.class,
    UtilsModule.class
})
@ComponentScan("com.github.proyeception.benito")
@Configuration
@EnableWebMvc
public class ServiceContext {
    @Bean(name = "multipartResolver")
    public CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setMaxUploadSize(10000000);
        return multipartResolver;
    }
}
