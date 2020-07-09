package com.github.proyeception.benito.config

import com.github.proyeception.benito.client.MangoClient
import com.github.proyeception.benito.service.SessionService
import com.github.proyeception.benito.service.UserService
import com.github.proyeception.benito.utils.HashUtil
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class ServiceModule {
    @Bean
    open fun mangoService(
        mangoClient: MangoClient,
        hashUtil: HashUtil
    ): UserService = UserService(mangoClient = mangoClient, hashUtil = hashUtil)

    @Bean
    open fun sessionService(hashUtil: HashUtil): SessionService = SessionService(hashUtil = hashUtil)
}