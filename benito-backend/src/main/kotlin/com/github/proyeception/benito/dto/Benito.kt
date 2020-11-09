package com.github.proyeception.benito.dto

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty
import org.springframework.data.mongodb.core.mapping.Document
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
    val documentation: List<DocumentationDTO>?,
    val organization: OrganizationRefDTO,
    val recommendations: List<RecommendationDTO>,
    val project_keywords: List<KeywordDTO>,
    val keywordMatchingDocs: List<DocumentationDTO> = emptyList(),
    val open: Boolean = false,
    val category: String?,
    @JsonIgnore val driveFolderId: String
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
        tags = medusa.tags.map{ it.tag_name },
        documentation = medusa.documentation,
        organization = OrganizationRefDTO(medusa.organization) ,
        recommendations = medusa.recommendations.map { RecommendationDTO(it) },
        project_keywords = medusa.project_keywords,
        keywordMatchingDocs = medusa.keywordMatchingDocs ?: emptyList(),
        open = medusa.open,
        driveFolderId = medusa.driveFolderId,
        category = medusa.category.name
    )
}

data class PersonDTO(
    val id: String,
    val username: String? = null,
    val fullName: String,
    val organizations: List<OrganizationDTO>,
    val profilePicUrl: String? = null,
    val projects: List<ProjectRefDTO>,
    val socials: SocialDTO,
    val contact: ContactDTO? = null,
    val about: String? = null,
    val apiKeys: List<Any> = emptyList(),
    val ghost: Boolean = false
)

data class OrganizationRefDTO(
    val id: String,
    val displayName: String,
    val header: String?,
    val color: String?
) {
    constructor(medusa: MedusaOrganizationDTO) : this(
        id = medusa.id,
        displayName = medusa.displayName,
        header = medusa.header.url,
        color = medusa.color
    )
}

data class OrganizationDTO(
    val id: String,
    val iconUrl: String,
    val header: String,
    val color: String,
    val name: String,
    val displayName: String,
    val supervisors: List<PersonRefDTO>,
    val authors: List<PersonRefDTO>
) {
    constructor(medusa: MedusaOrganizationDTO) : this(
        name = medusa.name,
        iconUrl = medusa.icon.url,
        header = medusa.header.url,
        color = medusa.color,
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
    val profilePictureUrl: String?,
    val token: String
)

data class UpdateContentDTO(
    val title: String?,
    val description: String?,
    val extraContent: String?,
    val documentation: List<String>
)

data class AddUsersDTO(
    val items: List<String>
)

data class SetTagsDTO(
    val tags: List<String>
)

data class MedusaSetTagsDTO(
    val tags: List<TagDTO>
)

data class TagDTO(
    val tag_name: String,
    val display_name: String
)

data class SetUsersDTO(
    val authors: List<String>,
    val supervisors: List<String>
)

data class CreateProjectDTO(
    val title: String,
    val creationDate: LocalDate,
    val organizationId: String,
    val categoryId: String
)

data class CategoryListDTO(
    val categories: List<CategoryRefDTO>
)

data class CategoryRefDTO(
    val id: String,
    val name: String
)

data class PersonRefDTO(
    val id: String,
    val fullName: String,
    val username: String?,
    val profilePicUrl: String? = null,
    val socials: SocialDTO = SocialDTO(),
    val mail: String? = null,
    val ghost: Boolean = false
) {
    constructor(medusa: MedusaPersonRefDTO) : this(
        id = medusa.id,
        fullName = medusa.fullName,
        username = medusa.username,
        profilePicUrl = medusa.profilePic?.url,
        socials = SocialDTO(
            facebook = medusa.facebook,
            linkedin = medusa.linkedin,
            twitter = medusa.twitter
        ),
        mail = medusa.mail,
        ghost = medusa.ghost
    )
}

data class RecommendationDTO(
    val id: String?,
    val score: Double,
    @JsonProperty("project") val projectId: String
){
    constructor(medusa: MedusaRecommendationDTO) : this(
        id = medusa.id,
        score = medusa.score,
        projectId = medusa.project
    )
}

data class CreateRecommendationDTO(
    @JsonProperty("project") val projectId: String,
    val score: Double
)

data class CrateViewDTO (
    val projectId: String
)

data class CreatedRecommendationDTO(
    val id: String,
    val score: Double,
    @JsonProperty("project") val projectId: CreatedProjectRecommendationDTO
)

data class CreatedProjectRecommendationDTO(
    val id: String
)

data class ProjectRecommendationDTO(
    val id: String,
    val project_keywords: List<KeywordDTO>,
    val recommendations: List<RecommendationDTO>
)

data class SetRecommendationDTO(
    val recommendations: List<RecommendationDTO>
)

data class CreateGhostUserDTO(
    val fullName: String,
    val organizations: List<String>,
    val projects: List<String>,
    val mail: String?,
    val ghost: Boolean = true
)

data class SearchProjectDTO(
    val projects: List<ProjectDTO>,
    val count: Int
)

data class CustomRecommendationDTO(
    val customizationId: String,
    val projectId: String,
    val views: Int
)

data class ProjectLinkDTO(
    val id: String,
    val name: String
)

data class ProjectLinksDTO(
    val projects: List<ProjectLinkDTO>
)