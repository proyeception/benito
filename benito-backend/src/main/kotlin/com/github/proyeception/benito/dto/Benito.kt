package com.github.proyeception.benito.dto

data class LoginRequestDTO(
    val username: String,
    val password: String
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
