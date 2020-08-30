package com.github.proyeception.benito.oauth

interface OAuthClient {
    fun initNewAuth(): Pair<String, String>

    fun finishNewAuth(authorization: String): String
}