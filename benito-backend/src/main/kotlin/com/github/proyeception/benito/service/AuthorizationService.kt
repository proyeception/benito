package com.github.proyeception.benito.service

import com.github.proyeception.benito.dto.RoleDTO
import com.github.proyeception.benito.dto.SessionInfoDTO
import com.github.proyeception.benito.exception.BadRequestException
import com.github.proyeception.benito.oauth.GoogleAccountClient
import org.slf4j.LoggerFactory

class AuthorizationService(
    private val googleAccountClient: GoogleAccountClient,
    private val userService: UserService,
    private val sessionService: SessionService
) {
    // TODO: do something with the secrets @infraboy
    fun initAuth(): String {
        val (_, redirectUrl) = googleAccountClient.initNewAuth()

        return redirectUrl
    }

    fun finishAuth(code: String, secret: String): String {
        val token = googleAccountClient.finishNewAuth(code)

        val user = googleAccountClient.userInfo(token)
        val googleUserId = user.metadata.sources.firstOrNull()?.id ?: throw BadRequestException("User must have an id")
        val maybePerson = userService.findAuthorByGoogleId(googleUserId)

        val (userId, profilePic) = if (maybePerson == null) {
            LOGGER.info("User does not exist. Creating...")
            val person = userService.createAuthor(
                fullName = user.names.firstOrNull()?.displayName ?: throw BadRequestException("User must have a name"),
                profilePicUrl = user.photos.firstOrNull()?.url,
                googleUserId = googleUserId,
                username = null,
                mail = user.emailAddresses.firstOrNull()?.value ?: throw BadRequestException("User must have an email"),
                googleToken = token
            )
            Pair(person.id, person.profilePic?.url)
        } else {
            LOGGER.info("User already exists.")
            Pair(maybePerson.id, maybePerson.profilePicUrl)
        }

        sessionService[token] = SessionInfoDTO(
            role = RoleDTO.AUTHOR,
            userId = userId,
            profilePicUrl = profilePic
        )
        // TODO: create a session token based off of the id
        return token
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(AuthorizationService::class.java)
    }
}