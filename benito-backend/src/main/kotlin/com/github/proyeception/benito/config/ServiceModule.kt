package com.github.proyeception.benito.config

import com.github.proyeception.benito.service.UserService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class ServiceModule {
    @Bean
    open fun mangoService(): UserService = UserService()
}