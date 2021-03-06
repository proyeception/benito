package com.github.proyeception.benito.config

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.client.MedusaGraphClient
import com.github.proyeception.benito.connector.GraphConnector
import com.github.proyeception.benito.connector.HttpConnector
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class ClientModule {
    @Bean("medusaClient")
    open fun medusaClient(medusaConnector: HttpConnector): MedusaClient = MedusaClient(medusaConnector)

    @Bean
    open fun medusaGraphClient(medusaGraphConnector: GraphConnector): MedusaGraphClient = MedusaGraphClient(
        medusaGraphConnector
    )
}