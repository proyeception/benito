package com.github.proyeception.benito.config

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.connector.Connector
import com.typesafe.config.Config
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class ConnectionModule {
    @Bean("mangoConnector")
    open fun mangoConnector(
        objectMapper: ObjectMapper,
        config: Config
    ): Connector = Connector.create(objectMapper, config.getConfig("mango"))
}