package com.github.proyeception.benito.dto

enum class UserTypeDTO {
    TEACHER,
    STUDENT,
    ADMINISTRATOR
}

data class LoginRequestDTO(
    val username: String,
    val password: String,
    val userType: UserTypeDTO
)

data class ProjectRefDTO(
    val url: String,
    val name: String
)

data class SocialRefDTO(
    val url: String,
    val name: String
)

data class UserInfoDTO(
    val id: String,
    val name: String,
    val lastName: String,
    val profilePicUrl: String,
    val email: String,
    val organization: String,
    val projectRefs: List<ProjectRefDTO>,
    val socials: List<SocialRefDTO>
)

data class UserSessionDTO(
    val sessionToken: String,
    val userInfo: UserInfoDTO
)

data class ErrorDTO(
    val status: Int,
    val message: String?,
    val stackTrace: List<String>?
)
