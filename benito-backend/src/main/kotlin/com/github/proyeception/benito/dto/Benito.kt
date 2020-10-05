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
    val pictureUrl: String?,
    val authors: List<PersonRefDTO>,
    val supervisors: List<PersonRefDTO>,
    val tags: List<String>,
    val documentation: List<DocumentationDTO>,
    val organization: OrganizationRefDTO,
    val recommendations: List<ProjectRecommendationDTO>,
    val keywords: List<KeywordDTO>
) {
    constructor(medusa: MedusaProjectDTO) : this(
        id = medusa.id,
        title = medusa.title,
        description = medusa.description,
        extraContent = medusa.extraContent.orEmpty(),
        creationDate = medusa.creationDate,
        pictureUrl = medusa.picture?.url,
        authors = medusa.authors.map { PersonRefDTO(it) },
        supervisors = medusa.supervisors.map { PersonRefDTO(it) },
        tags = emptyList(),
        documentation = medusa.documentation,
        organization = OrganizationRefDTO(medusa.organization) ,
        recommendations = medusa.recommendations,
        keywords = medusa.keywords
    )
}

data class PersonDTO(
    val id: String,
    val username: String? = null,
    val fullName: String,
    val organizations: List<OrganizationDTO>,
    val profilePicUrl: String? = null,
    val projects: List<ProjectRefDTO>,
    val socials: List<SocialDTO>,
    val contact: ContactDTO? = null,
    val about: String? = null,
    val apiKeys: List<Any> = emptyList()
)

data class OrganizationRefDTO(
    val id: String,
    val displayName: String
) {
    constructor(medusa: MedusaOrganizationDTO) : this(
        id = medusa.id,
        displayName = medusa.displayName
    )
}

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
        supervisors = medusa.supervisors.map { PersonRefDTO(it) },
        authors = medusa.authors.map { PersonRefDTO(it) }
    )
}

data class ProjectRefDTO(
    val id: String,
    val title: String,
    val pictureUrl: String?,
    val organization: OrganizationDTO,
    val description: String
)

data class SessionInfoDTO(
    val role: RoleDTO,
    val userId: String
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

data class SetUsersDTO(
    val authors: List<String>,
    val supervisors: List<String>
)

data class CreateProjectDTO(
    val title: String,
    val organizationId: String,
    val categoryId: String
)

data class PersonRefDTO(
    val id: String,
    val fullName: String,
    val username: String?,
    val profilePicUrl: String? = null
) {
    constructor(medusa: MedusaPersonRefDTO) : this(
        id = medusa.id,
        fullName = medusa.fullName,
        username = medusa.username,
        profilePicUrl = medusa.profilePic?.url
    )
}

data class ProjectRecommendationDTO(
        val id: String
)