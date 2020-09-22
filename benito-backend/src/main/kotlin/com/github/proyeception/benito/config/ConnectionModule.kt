package com.github.proyeception.benito.config

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.connector.HttpConnector
import com.github.proyeception.benito.connector.DynamicOAuthConnector
import com.github.proyeception.benito.connector.OAuthConnector
import com.github.scribejava.apis.GoogleApi20
import com.typesafe.config.Config
import org.apache.http.message.BasicHeader
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class ConnectionModule {
    @Bean("medusaConnector")
    open fun medusaConnector(
        @Qualifier("objectMapperSnakeCase") objectMapperSnakeCase: ObjectMapper,
        config: Config
    ): HttpConnector = HttpConnector.create(
        objectMapperSnakeCase,
        config.getConfig("medusa"),
        listOf(
            BasicHeader(
                "Authorization",
                System.getenv("MEDUSA_AUTHORIZATION") ?: config.getString("medusa.authorization")
            )
        )
    )

    @Bean("googleDriveConnector")
    open fun googleDriveConnector(
        @Qualifier("objectMapperCamelCase") objectMapperCamelCase: ObjectMapper,
        config: Config
    ): OAuthConnector = OAuthConnector.create(
        moduleConfig = config.getConfig("google.drive"),
        objectMapper = objectMapperCamelCase,
        api = GoogleApi20.instance(),
        moduleName = "google_drive"
    )

    @Bean("googleAccountConnector")
    open fun googleAccountConnector(
        @Qualifier("objectMapperCamelCase") objectMapperCamelCase: ObjectMapper,
        config: Config
    ): DynamicOAuthConnector = DynamicOAuthConnector.create(
        moduleConfig = config.getConfig("google.login"),
        objectMapper = objectMapperCamelCase,
        api = GoogleApi20.instance(),
        moduleName = "google_login"
    )
}