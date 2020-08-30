package com.github.proyeception.benito.service

import com.github.proyeception.benito.oauth.GoogleAccountClient

class AuthorizationService(
    private val googleAccountClient: GoogleAccountClient
) {
    fun initAuth(): String {
        val (secret, redirectUrl) = googleAccountClient.initNewAuth()

        return redirectUrl
    }

    fun finishAuth(code: String, secret: String): String {
        // TODO: store the token
        val token = googleAccountClient.finishNewAuth(code)
        val user = googleAccountClient.userInfo()

        // TODO: create a session token
        return "asd"
    }
}