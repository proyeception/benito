package com.github.proyeception.benito.config

import com.github.proyeception.benito.utils.FileHelper
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class UtilsModule {
    @Bean
    open fun fileHelper() = FileHelper()
}