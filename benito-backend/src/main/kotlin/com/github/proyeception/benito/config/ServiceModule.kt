package com.github.proyeception.benito.config

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.service.ProjectService
import org.springframework.context.annotation.Bean


open class ServiceModule {
    @Bean
    open fun projectService(
        medusaClient: MedusaClient
    ): ProjectService = ProjectService(medusaClient = medusaClient)
}