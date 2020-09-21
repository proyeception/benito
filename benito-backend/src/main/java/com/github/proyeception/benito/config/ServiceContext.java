package com.github.proyeception.benito.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@Import({
    ClientModule.class,
    ConfigModule.class,
    ConnectionModule.class,
    MvcConfig.class,
    OAuthModule.class,
    ObjectMapperModule.class,
    ParserModule.class,
    ServiceModule.class,
    SnapshotModule.class,
    UtilsModule.class
})
@ComponentScan("com.github.proyeception.benito")
@Configuration
public class ServiceContext {
    @Bean(name = "multipartResolver")
    public CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setMaxUploadSize(10000000);
        return multipartResolver;
    }
}
