package com.github.proyeception.benito.client

interface OAuthClient {
    fun initNewAuth(): String

    fun finishNewAuth(authorization: String): String
}