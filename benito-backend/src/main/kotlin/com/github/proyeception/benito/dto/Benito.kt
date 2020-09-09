package com.github.proyeception.benito.dto

import java.time.LocalDate

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
    VIEWS_ASC("views:ASC"),
    VIEWS_DESC("views:DESC")
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
    val posterUrl: String?,
    val authors: List<PersonRefDTO>,
    val supervisors: List<PersonRefDTO>,
    val tags: List<String>,
    val documentation: List<DocumentationDTO>
) {
    constructor(medusaProjectDTO: MedusaProjectDTO) : this(
        id = medusaProjectDTO.id,
        title = medusaProjectDTO.title,
        description = medusaProjectDTO.description,
        extraContent = medusaProjectDTO.extraContent.orEmpty(),
        creationDate = medusaProjectDTO.creationDate,
        posterUrl = medusaProjectDTO.poster?.url,
        authors = medusaProjectDTO.authors,
        supervisors = medusaProjectDTO.supervisors,
        tags = emptyList(),
        documentation = medusaProjectDTO.documentation
    )
}

data class PersonDTO(
    val id: String,
    val username: String?,
    val fullName: String,
    val organizations: List<OrganizationDTO>,
    val profilePicUrl: String?,
    val projects: List<ProjectRefDTO>,
    val socials: List<SocialDTO>,
    val contact: ContactDTO?
)

data class OrganizationDTO(
    val id: String,
    val iconUrl: String,
    val name: String,
    val displayName: String,
    val supervisors: List<PersonRefDTO>,
    val authors: List<PersonRefDTO>
) {
    constructor(medusa: MedusaOrganizationDTO) : this(
        name = medusa.name,
        iconUrl = medusa.icon.url,
        displayName = medusa.displayName,
        id = medusa.id,
        supervisors = medusa.supervisors,
        authors = medusa.authors
    )
}

data class ProjectRefDTO(
    val id: String,
    val title: String,
    val posterUrl: String?,
    val organization: OrganizationDTO,
    val description: String
)

data class SessionInfoDTO(
    val role: RoleDTO,
    val userId: String,
    val profilePicUrl: String?
)

enum class RoleDTO {
    SUPERVISOR,
    AUTHOR,
}

data class LoginDTO(
    val googleUserId: String,
    val fullName: String,
    val mail: String,
    val profilePicUrl: String?,
    val token: String
)

data class UpdateContentDTO(
    val title: String?,
    val description: String?,
    val extraContent: String?
)

data class AddUsersDTO(
    val items: List<String>
)

data class CreateProjectDTO(
    val title: String,
    val organizationId: String,
    val categoryId: String
)
