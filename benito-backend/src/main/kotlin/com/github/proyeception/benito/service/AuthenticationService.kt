package com.github.proyeception.benito.service

import com.github.proyeception.benito.dto.LoginDTO
import com.github.proyeception.benito.dto.RoleDTO
import com.github.proyeception.benito.dto.SessionInfoDTO
import com.github.proyeception.benito.exception.UnauthorizedException
import com.github.proyeception.benito.extension.fromCamelToKebab
import com.github.proyeception.benito.utils.HashHelper
import org.slf4j.LoggerFactory

open class AuthenticationService(
    private val userService: UserService,
    private val sessionService: SessionService,
    private val hash: HashHelper
) {
    open fun authenticateSupervisor(login: LoginDTO): String = userService.findSupervisorByEmail(login.mail)
        ?.let {
            val token = hash.sha256(login.token)
            sessionService[token] = SessionInfoDTO(
                RoleDTO.SUPERVISOR,
                it.id
            )
            token
        }
        ?: throw UnauthorizedException("You're not registered as a supervisor")

    open fun authenticateOrCreateAuthor(login: LoginDTO): String {
        val maybePerson = userService.findAuthorByGoogleId(login.googleUserId)

        val (userId, profilePic) = if (maybePerson == null) {
            LOGGER.info("User does not exist. Creating...")
            val person = userService.createAuthor(
                fullName = login.fullName,
                profilePicUrl = login.profilePicUrl,
                googleUserId = login.googleUserId,
                username = login.fullName.fromCamelToKebab(),
                mail = login.mail,
                googleToken = login.token
            )
            Pair(person.id, person.profilePicUrl)
        } else {
            LOGGER.info("User already exists.")
            Pair(maybePerson.id, maybePerson.profilePicUrl)
        }

        val token = hash.sha256(login.token)

        sessionService[token] = SessionInfoDTO(
            role = RoleDTO.AUTHOR,
            userId = userId
        )
        return token
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(AuthenticationService::class.java)
    }
}