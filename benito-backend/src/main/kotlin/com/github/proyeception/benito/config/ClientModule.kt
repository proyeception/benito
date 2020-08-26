package com.github.proyeception.benito.config

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.connector.Connector
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class ClientModule {
    @Bean("medusaClient")
    open fun medusaClient(medusaConnector: Connector): MedusaClient = MedusaClient(medusaConnector)


}