package com.github.proyeception.benito.config

import com.github.proyeception.benito.controller.LoginController
import com.github.proyeception.benito.controller.ProjectController
import com.github.proyeception.benito.service.ProjectService
import com.github.proyeception.benito.service.SessionService
import com.github.proyeception.benito.service.UserService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class ControllerModule {
    @Bean("projectController")
    open fun projectController(
            projectService: ProjectService
    ): ProjectController = ProjectController(projectService = projectService)
}