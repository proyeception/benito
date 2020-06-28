package com.github.proyeception.benito.service

import arrow.fx.IO
import arrow.fx.extensions.fx
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.dto.AuthenticationResponseDTO
import com.github.proyeception.benito.dto.UserLoginDTO
import com.github.proyeception.benito.exception.AuthenticationFailedException
import com.github.proyeception.benito.exception.FailedDependencyException

open class SapiensService(
    private val sapiensConnector: Connector,
    private val objectMapper: ObjectMapper
) {
    fun authenticate(userLoginDTO: UserLoginDTO): IO<AuthenticationResponseDTO> = IO.fx {
        val (response) = sapiensConnector.post("/sapiens/authenticate", userLoginDTO)

        if (response.isError()) {
            throw AuthenticationFailedException("Error authenticating user ${userLoginDTO.username}")
        } else {
            response.body?.let { objectMapper.readValue(it) } ?: throw FailedDependencyException(
                "Sapiens returned null body for user ${userLoginDTO.username}"
            )
        }
    }
}