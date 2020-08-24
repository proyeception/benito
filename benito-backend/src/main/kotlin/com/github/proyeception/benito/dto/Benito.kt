package com.github.proyeception.benito.dto

import java.time.LocalDate

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

enum class OrderDTO(val sortMethod: String) {
    DATE_ASC("creation_date:ASC"),
    DATE_DESC("creation_date:DESC"),
    ALPHA_ASC("title:ASC"),
    ALPHA_DESC("title:DESC"),
}

data class CountDTO(
    val total: Int
)

data class ProjectDTO(
    val id: String,
    val title: String,
    val description: String,
    val extraContent: String,
    val creationDate: LocalDate,
    val posterUrl: String,
    val authors: List<PersonDTO>,
    val supervisors: List<PersonDTO>,
    val tags: List<String>,
    val documentation: List<DocumentationDTO>
) {
    constructor(medusaProjectDTO: MedusaProjectDTO) : this(
        id = medusaProjectDTO.id,
        title = medusaProjectDTO.title,
        description = medusaProjectDTO.description,
        extraContent = medusaProjectDTO.extraContent.orEmpty(),
        creationDate = medusaProjectDTO.creationDate,
        posterUrl = medusaProjectDTO.poster.url,
        authors = medusaProjectDTO.authorRefs.map {
            PersonDTO(
                username = it.username,
                fullName = it.fullName,
                profileUrl = it.profileUrl
            )
        },
        supervisors = medusaProjectDTO.supervisorRefs.map {
            PersonDTO(
                username = it.username,
                fullName = it.fullName,
                profileUrl = it.profileUrl
            )
        },
        tags = emptyList(),
        documentation = medusaProjectDTO.documentation
    )
}

data class PersonDTO(
    val username: String,
    val fullName: String,
    val profileUrl: String
)

data class DocumentDTO(
    val name: String,
    val downloadLink: String
)