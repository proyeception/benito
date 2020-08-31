package com.github.proyeception.benito.service

import com.github.proyeception.benito.exception.BadRequestException
import com.github.proyeception.benito.oauth.GoogleAccountClient

class AuthorizationService(
    private val googleAccountClient: GoogleAccountClient,
    private val userService: UserService
) {
    // TODO: do something with the secrets @infraboy
    fun initAuth(): String {
        val (secret, redirectUrl) = googleAccountClient.initNewAuth()

        return redirectUrl
    }

    fun finishAuth(code: String, secret: String): String {
        val token = googleAccountClient.finishNewAuth(code)

        val maybePerson = userService.findAuthorByGoogleToken(token)

        if (maybePerson == null) {
            doCreateAuthor(token)
        }

        // TODO: create a session token based off of the token
        return token
    }

    private fun doCreateAuthor(token: String) {
        val user = googleAccountClient.userInfo()
        val userId = user.metadata.sources.firstOrNull()?.id ?: throw BadRequestException("User must have an id")

        userService.createAuthor(
            fullName = user.names.firstOrNull()?.displayName ?: throw BadRequestException("User must have a name"),
            profilePicUrl = user.photos.firstOrNull()?.url,
            userId = userId,
            username = null,
            mail = user.emailAddresses.firstOrNull()?.value ?: throw BadRequestException("User must have an email"),
            googleToken = token
        )
    }
}