package com.github.proyeception.benito.config

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.connector.OAuthConnector
import com.github.proyeception.benito.oauth.GoogleDriveClient
import com.github.scribejava.apis.GoogleApi20
import com.github.scribejava.core.builder.ServiceBuilder
import com.github.scribejava.core.oauth.OAuth20Service
import com.typesafe.config.Config
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

    @Bean("oAuth20Service")
    open fun oAuth20Service(
        config: Config
    ): OAuth20Service {
        val googleConfig = config.getConfig("google")

        return ServiceBuilder(googleConfig.getString("id"))
            .apiSecret(googleConfig.getString("token"))
            .defaultScope("https://www.googleapis.com/auth/drive")
            .callback(googleConfig.getString("callback"))
            .build(GoogleApi20.instance());
    }
}