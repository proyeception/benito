package com.github.proyeception.benito.dto

data class AuthenticationRequestDTO(
    private val username: String,
    private val password: String,
    private val userType: String
) {
    constructor(userLoginDTO: UserLoginDTO) : this(
        username = userLoginDTO.username,
        password = userLoginDTO.password,
        userType = userLoginDTO.userType.toString()
    )
}

data class AuthenticationResponseDTO(
    val session: String
)