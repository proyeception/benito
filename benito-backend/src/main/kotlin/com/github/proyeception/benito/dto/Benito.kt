package com.github.proyeception.benito.dto

data class UserLoginDTO(
    val username: String,
    val password: String,
    val userType: UserTypeDTO
)

data class ErrorDTO(
    val status: Int,
    val message: String?
)

enum class UserTypeDTO {
    TEACHER,
    STUDENT,
}