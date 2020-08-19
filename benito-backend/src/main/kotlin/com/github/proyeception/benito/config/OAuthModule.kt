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
    open fun googleDriveOAuthClient(oAuth20Service: OAuth20Service, @Value("google.token")token: String): GoogleDriveOAuthClient = GoogleDriveOAuthClient(oAuth20Service, "1//0hGvXqiYLwBoBCgYIARAAGBESNwF-L9Iro1MSXRR1mQrIWOD86bqcedYMHGk8WoU1LvGRrLtpmv9gzg11cj-sV9rPscVwM-vpT0M")

    @Bean("oAuth20Service")
    open fun OAuth20Service(@Value("google.secret")secret: String, @Value("google.id")id: String): OAuth20Service =  ServiceBuilder(id)
            .apiSecret(secret)
            .defaultScope("https://www.googleapis.com/auth/drive")
            .callback("http://example.com/callback")
            .build(GoogleApi20.instance());
}