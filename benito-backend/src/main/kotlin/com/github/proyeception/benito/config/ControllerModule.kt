package com.github.proyeception.benito.config

import com.typesafe.config.Config
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration


@Configuration
open class ControllerModule {
    @Bean @Qualifier("onAuthorizeRedirect")
    open fun onAuthorizeRedirect(conf: Config): String = conf.getString("google.login.auth.redirect")
}