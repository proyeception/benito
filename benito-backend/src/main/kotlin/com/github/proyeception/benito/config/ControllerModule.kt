package com.github.proyeception.benito.config

import com.github.proyeception.benito.controller.ExceptionController
import com.github.proyeception.benito.controller.OAuthController
import com.github.proyeception.benito.controller.ProjectController
import com.github.proyeception.benito.service.ProjectService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class ControllerModule {
    @Bean("projectController")
    open fun projectController(
        projectService: ProjectService
    ): ProjectController = ProjectController(projectService = projectService)

    @Bean("controllerAdvice")
    open fun exceptionController(env: Environment): ExceptionController = ExceptionController(env)

    @Bean("oauthController")
    open fun oauthController() = OAuthController()
}