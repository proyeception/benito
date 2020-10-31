package com.github.proyeception.benito.config

import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter

@EnableWebSecurity
class SecurityConfig : WebSecurityConfigurerAdapter() {
    @Throws(Exception::class)
    protected fun configure(http: HttpSecurity) {
        http.requiresChannel().anyRequest().requiresSecure()
    }
}