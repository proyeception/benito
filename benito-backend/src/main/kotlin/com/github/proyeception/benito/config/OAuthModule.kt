package com.github.proyeception.benito.config

import com.github.proyeception.benito.oauth.GoogleDriveOAuthClient
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
        oAuth20Service: OAuth20Service,
        config: Config
    ): GoogleDriveOAuthClient {
        val googleConfig = config.getConfig("google")
        return GoogleDriveOAuthClient(
            token = googleConfig.getString("token"),
            clientId = googleConfig.getString("id"),
            clientSecret = googleConfig.getString("secret"),
            callbackRoute = "/benito/callback"
        )
    }

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