package com.github.proyeception.benito.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Import({
    ClientModule.class,
    ConfigModule.class,
    ConnectionModule.class,
    ObjectMapperModule.class,
    ServiceModule.class
})
@ComponentScan("com.github.proyeception.benito")
@Configuration
public class ServiceContext {
}