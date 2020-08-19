package com.github.proyeception.benito.config

import com.github.proyeception.benito.oauth.GoogleDriveOAuthClient
import com.github.scribejava.apis.GoogleApi20
import com.github.scribejava.core.builder.ServiceBuilder
import com.github.scribejava.core.oauth.OAuth20Service
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class OAuthModule {
    @Bean("googleDriveOAuthClient")
    open fun googleDriveOAuthClient(oAuth20Service: OAuth20Service, @Value("google.token")token: String): GoogleDriveOAuthClient = GoogleDriveOAuthClient(oAuth20Service, token)

    @Bean("oAuth20Service")
    open fun OAuth20Service(@Value("google.secret")secret: String, @Value("google.token")token: String): OAuth20Service =  ServiceBuilder(token)
            .apiSecret(secret)
            .build(GoogleApi20.instance());
}