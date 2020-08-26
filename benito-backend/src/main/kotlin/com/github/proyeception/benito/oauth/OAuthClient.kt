package com.github.proyeception.benito.oauth

interface OAuthClient {
    fun initNewAuth(): String

    fun finishNewAuth(authorization: String): String
}