package com.github.proyeception.benito.dto

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDate
import java.time.format.DateTimeFormatter


data class MedusaProjectDTO(
    val id: String,
    val title: String,
    val description: String,
    val extraContent: String?,
    val creationDate: LocalDate,
    val picture: MedusaFileDTO?,
    val authors: List<MedusaPersonRefDTO>,
    val supervisors: List<MedusaPersonRefDTO>,
    val documentation: List<DocumentationDTO>,
    val category: CategoryDTO,
    val organization: MedusaOrganizationDTO,
    val tags: List<MedusaTagDTO>,
    val recommendations: List<MedusaRecommendationDTO>,
    val project_keywords: List<KeywordDTO>
)

data class MedusaPersonRefDTO(
    val id: String,
    val username: String?,
    val fullName: String,
    val profilePic: MedusaFileDTO? = null,
    val facebook: String? = null,
    val linkedin: String? = null,
    val twitter: String? = null
)

data class CreateMedusaPersonDTO(
    val username: String?,
    val fullName: String,
    val mail: String,
    val profilePic: String?,
    val googleUserId: String,
    val googleToken: String
)

data class MedusaPersonDTO(
    val id: String,
    val username: String?,
    val fullName: String,
    val organizations: List<MedusaOrganizationDTO>,
    val profilePic: MedusaFileDTO? = null,
    val projects: List<MedusaProjectRefDTO>,
    val mail: String? = null,
    val phone: String? = null,
    val about: String? = null,
    val facebook: String? = null,
    val linkedin: String? = null,
    val twitter: String? = null,
    val views: List<ViewRefDTO>
)

data class ViewRefDTO(
        val id: String,
        val projectId: String?
)

data class MedusaProjectRefDTO(
    val id: String,
    val title: String,
    val picture: MedusaFileDTO?,
    @JsonProperty("organization") val organizationId: String,
    val description: String
)

data class MedusaFileDTO(
    val url: String,
    val id: String
)

data class DocumentationDTO(
    val id: String,
    val fileName: String,
    val driveId: String
)

data class CreateDocumentDTO(
    val fileName: String,
    val driveId: String,
    val content: String
)

data class CreateDocumentsDTO(
    val items: List<CreateDocumentDTO>
)

data class CategoryDTO(
    val id: String,
    val name: String,
    val tagName: String,
    val imageUrl: String
)

enum class MedusaFilter(val filterName: String) {
    GREATER_OR_EQUAL("gte"),
    LESS_OR_EQUAL("lte"),
    CONTAINS("contains"),
    EQ("eq"),
}

data class MedusaOrganizationDTO(
    val id: String,
    val displayName: String,
    val name: String,
    val icon: MedusaFileDTO,
    val supervisors: List<MedusaPersonRefDTO> = emptyList(),
    val authors: List<MedusaPersonRefDTO> = emptyList()
)

data class MedusaTagDTO(
    val tagName: String,
    val displayName: String
)

data class SocialDTO(
    val facebook: String? = null,
    val linkedin: String? = null,
    val twitter: String? = null
)

data class ContactDTO(
    val phone: String?,
    val mail: String?
)

data class UpdatePictureDTO(
    val picture: MedusaFileDTO
)

data class UpdateProfilePictureDTO(
    val profilePic: MedusaFileDTO
)

enum class UserType(val collection: String) {
    AUTHOR("authors"),
    SUPERVISOR("supervisors"),
}

data class UpdateUserDTO(
    val mail: String?,
    val phone: String?,
    val fullName: String?,
    val username: String?,
    val socials: SocialDTO
)

data class CreateMedusaProjectDTO(
    val organization: String,
    val title: String,
    val description: String = "",
    val creationDate: String = LocalDate.now().format(dtf),
    val supervisors: List<String>,
    val category: String
)

data class KeywordDTO(
    val id: String?,
    val name: String,
    val score: Double
)

data class KeywordsWrapper(
    val keywords: List<KeywordDTO>
)

data class ProjectKeywords(
    val project_keywords: List<String>
)

data class ProjectRecommendations(
    val recommendations: List<String>
)

data class PersonsViews(
        val views: List<String>
)

data class MedusaRecommendationDTO(
    val id: String,
    val score: Double,
    val project: String
)

data class CreatePendingSupervisorDTO(
    val googleUserId: String?,
    val fullName: String?,
    val mail: String?,
    @JsonProperty("organization") val organizationId: String?,
    val profilePic: String?
)

private val dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd")

data class UpdateMedusaUserDTO(
    val mail: String?,
    val phone: String?,
    val fullName: String?,
    val username: String?,
    val facebook: String?,
    val linkedin: String?,
    val twitter: String?
) {
    constructor (user: UpdateUserDTO) : this(
        mail = user.mail,
        phone = user.phone,
        fullName = user.fullName,
        username = user.username,
        facebook = user.socials.facebook,
        linkedin = user.socials.linkedin,
        twitter = user.socials.twitter
    )
}
