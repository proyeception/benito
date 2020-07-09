package com.github.proyeception.benito.service

import arrow.fx.IO
import arrow.fx.extensions.fx
import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.dto.AuthenticationRequestDTO
import com.github.proyeception.benito.dto.AuthenticationResponseDTO
import com.github.proyeception.benito.dto.UserLoginDTO
import com.github.proyeception.benito.exception.AuthenticationFailedException

open class SapiensService(
    private val sapiensConnector: Connector
) {
    fun authenticate(userLoginDTO: UserLoginDTO): IO<AuthenticationResponseDTO> = IO.fx {
        val (response) = sapiensConnector.post("sapiens/authenticate", AuthenticationRequestDTO(userLoginDTO))
        if (response.isError()) {
            throw AuthenticationFailedException("Error authenticating user ${userLoginDTO.username}")
        } else {
            response.deserializeAs(object : TypeReference<AuthenticationResponseDTO>() {})
        }
    }
}