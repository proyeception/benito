package com.github.proyeception.benito.config

import com.typesafe.config.Config
import com.typesafe.config.ConfigFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class ConfigModule {
    @Bean("config")
    open fun config(): Config = ConfigFactory.load()

    @Bean("env")
    open fun env(config: Config): Environment = Environment.valueOf(config.getString("env").toUpperCase())
}