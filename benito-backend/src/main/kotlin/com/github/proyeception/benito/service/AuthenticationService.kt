package com.github.proyeception.benito.service

import com.github.proyeception.benito.dto.LoginDTO
import com.github.proyeception.benito.dto.RoleDTO
import com.github.proyeception.benito.dto.SessionInfoDTO
import org.slf4j.LoggerFactory

open class AuthenticationService(
    private val userService: UserService,
    private val sessionService: SessionService
) {
    open fun authenticate(login: LoginDTO): String {
        val maybePerson = userService.findAuthorByGoogleId(login.googleUserId)
        val token = login.token

        val (userId, profilePic) = if (maybePerson == null) {
            LOGGER.info("User does not exist. Creating...")
            val person = userService.createAuthor(
                fullName = login.fullName,
                profilePicUrl = login.profilePicUrl,
                googleUserId = login.googleUserId,
                username = null,
                mail = login.mail,
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
        private val LOGGER = LoggerFactory.getLogger(AuthenticationService::class.java)
    }
}