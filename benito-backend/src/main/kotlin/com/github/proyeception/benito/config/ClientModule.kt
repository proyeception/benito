package com.github.proyeception.benito.config

import com.github.proyeception.benito.client.MangoClient
import com.github.proyeception.benito.connector.Connector
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class ClientModule {
    @Bean("mangoClient")
    open fun mangoClient(mangoConnector: Connector): MangoClient = MangoClient(mangoConnector)
}