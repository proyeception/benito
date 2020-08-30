package com.github.proyeception.benito.config

import com.github.proyeception.benito.repository.UserLoginRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class RepositoryModule {
    @Bean
    open fun userLoginRepository(): UserLoginRepository = UserLoginRepository()
}