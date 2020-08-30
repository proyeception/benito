package com.github.proyeception.benito.service

import com.github.proyeception.benito.exception.BadRequestException
import com.github.proyeception.benito.oauth.GoogleAccountClient
import java.net.URL
import javax.imageio.ImageIO

class AuthorizationService(
    private val googleAccountClient: GoogleAccountClient,
    private val userService: UserService
) {
    fun initAuth(): String {
        val (secret, redirectUrl) = googleAccountClient.initNewAuth()

        return redirectUrl
    }

    fun finishAuth(code: String, secret: String): String {
        // TODO: store the token
        val token = googleAccountClient.finishNewAuth(code)
        val user = googleAccountClient.userInfo()
        val userId = user.metadata.sources.firstOrNull()?.id ?: throw BadRequestException("User must have an id")

        userService.createAuthor(
            fullName = user.names.firstOrNull()?.displayName ?: throw BadRequestException("User must have a name"),
            profilePicUrl = user.photos.firstOrNull()?.url,
            userId = userId,
            username = null,
            mail = user.emailAddresses.firstOrNull()?.value ?: throw BadRequestException("User must have an email")
        )

        // TODO: create a session token
        return userId
    }
}