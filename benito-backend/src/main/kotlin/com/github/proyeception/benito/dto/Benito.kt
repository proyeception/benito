package com.github.proyeception.benito.dto

import com.github.proyeception.benito.injection.Encryptor


class UserLoginDTO(
    username: String,
    password: String,
    userType: UserTypeDTO
) {
    val user : String
    val pass : String
    val userT : UserTypeDTO
    var secretKey: String = "662ede816988e58fb6d057d9d85605e0" //la copie y pegue de un lugar, capaz

    init {
        user = username
        pass = Encryptor.encrypt(password, secretKey)
        userT = userType
    }
}


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
    PROFESSOR,
    STUDENT,
    ADMIN
}
