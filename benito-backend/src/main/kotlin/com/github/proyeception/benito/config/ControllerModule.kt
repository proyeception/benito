package com.github.proyeception.benito.config

import com.github.proyeception.benito.controller.LoginController
import com.github.proyeception.benito.service.MangoService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class ControllerModule {
    @Bean
    open fun benitoController(
        mangoService: MangoService
    ): LoginController = LoginController(
        mangoService = mangoService
    )
}