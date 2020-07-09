package com.github.proyeception.benito.config;

import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableWebMvc
@Import({
    ClientModule.class,
    ConfigModule.class,
    ConnectionModule.class,
    ControllerModule.class,
    HashModule.class,
    ObjectMapperModule.class,
    ServiceModule.class
})
public class ServiceContext {
}