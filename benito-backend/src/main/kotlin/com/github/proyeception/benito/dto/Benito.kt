package com.github.proyeception.benito.dto

data class UserLoginDTO(
    val username: String,
    val password: String,
    val userType: UserTypeDTO
)

enum class UserTypeDTO {
    TEACHER,
    STUDENT,
}