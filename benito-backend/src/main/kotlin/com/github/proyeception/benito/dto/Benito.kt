package com.github.proyeception.benito.dto

data class UserLoginDTO(
    val username: String,
    val password: String,
    val userType: UserTypeDTO
)

data class UserInfoDTO(
    val session: String,
    val name: String,
    val lastName: String,
    val profilePicUrl: String,
    val email: String,
    val organization: String,
    val projectRefs: List<ProjectRefDTO>,
    val socials: List<SocialDTO>
) {
    constructor(authenticationResponseDTO: AuthenticationResponseDTO) : this(
        session = authenticationResponseDTO.session,
        name = authenticationResponseDTO.userData.name,
        lastName = authenticationResponseDTO.userData.lastName,
        profilePicUrl = authenticationResponseDTO.userData.profilePicUrl,
        email = authenticationResponseDTO.userData.email,
        organization = authenticationResponseDTO.userData.organization,
        projectRefs = authenticationResponseDTO.userData.projectRefs,
        socials = authenticationResponseDTO.userData.socials
    )
}

data class ProjectRefDTO(
    val name: String,
    val url: String
)

data class SocialDTO(
    val name: String,
    val url: String
)

data class ErrorDTO(
    val status: Int,
    val message: String?
)

enum class UserTypeDTO {
    TEACHER,
    STUDENT,
}
