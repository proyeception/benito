package com.github.proyeception.benito.config

import com.github.proyeception.benito.service.MangoService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class ServiceModule {
    @Bean
    open fun mangoService(): MangoService = MangoService()
}