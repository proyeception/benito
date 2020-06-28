package com.github.proyeception.benito.dto

data class SapiensLoginRequestDTO(
    private val username: String,
    private val password: String
) {
    constructor(userLoginDTO: UserLoginDTO) : this(
        username = userLoginDTO.username,
        password = userLoginDTO.password
    )
}

data class AuthenticationResponseDTO(
    val session: String
)