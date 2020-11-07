package com.github.proyeception.benito.service

import com.github.proyeception.benito.dto.RoleDTO
import com.github.proyeception.benito.dto.SessionInfoDTO
import com.github.proyeception.benito.exception.NotFoundException
import com.github.proyeception.benito.exception.UnauthorizedException
import com.github.proyeception.benito.utils.HashHelper
import org.slf4j.LoggerFactory

open class AuthenticationService(
    private val userService: UserService,
    private val sessionService: SessionService,
    private val hash: HashHelper
) {
    open fun authenticateSupervisor(mail: String, googleToken: String): String = userService.findSupervisorByEmail(mail)
        ?.let {
            val token = hash.sha256(googleToken)
            sessionService[token] = SessionInfoDTO(
                RoleDTO.SUPERVISOR,
                it.id
            )
            token
        }
        ?: throw UnauthorizedException("You're not registered as a supervisor")

    open fun authenticateAuthor(mail: String, googleToken: String): String {
        LOGGER.info("Login from $mail")

        return userService.findAuthorByEmail(mail)
            ?.let {
                LOGGER.info("User found")

                val token = hash.sha256(googleToken)

                sessionService[token] = SessionInfoDTO(
                    role = RoleDTO.AUTHOR,
                    userId = it.id
                )

                token
            }
            ?: {
                LOGGER.error("User not found")
                throw UnauthorizedException("User $mail not found")
            }.invoke()
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(AuthenticationService::class.java)
    }
}