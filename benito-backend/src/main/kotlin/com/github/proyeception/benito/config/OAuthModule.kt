package com.github.proyeception.benito.config

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.connector.DynamicOAuthConnector
import com.github.proyeception.benito.connector.OAuthConnector
import com.github.proyeception.benito.oauth.GoogleAccountClient
import com.github.proyeception.benito.oauth.GoogleDriveClient
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class OAuthModule {
    @Bean("googleDriveOAuthClient")
    open fun googleDriveOAuthClient(
        googleDriveConnector: OAuthConnector,
        objectMapperCamelCase: ObjectMapper
    ): GoogleDriveClient = GoogleDriveClient(
        googleDriveConnector = googleDriveConnector,
        objectMapper = objectMapperCamelCase
    )

    @Bean("googleAccountOAuthClient")
    open fun googleAccountOAuthClient(
        googleAccountConnector: DynamicOAuthConnector
    ): GoogleAccountClient = GoogleAccountClient(
        googleAccountConnector = googleAccountConnector
    )
}