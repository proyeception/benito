package com.github.proyeception.benito.dto

data class SapiensLoginRequestDTO(
    private val username: String,
    private val password: String
) {
    constructor(studentLoginDTO: StudentLoginDTO) : this(
        username = studentLoginDTO.username,
        password = studentLoginDTO.password
    )
}

data class AuthenticationResponseDTO(
    val session: String
)