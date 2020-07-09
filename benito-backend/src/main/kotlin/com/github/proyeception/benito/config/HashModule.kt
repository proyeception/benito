package com.github.proyeception.benito.config

import com.github.proyeception.benito.utils.HashUtil
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class HashModule {
    @Bean("hashUtil")
    open fun hashUtil(): HashUtil = HashUtil()
}