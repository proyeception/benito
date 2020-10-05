package com.github.proyeception.benito.dto

import com.fasterxml.jackson.annotation.JsonProperty
import java.math.BigDecimal
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
    val recommendations: List<ProjectRecommendationDTO>,
    val keywords: List<KeywordDTO>
)

data class MedusaPersonRefDTO(
    val id: String,
    val username: String?,
    val fullName: String,
    val profilePic: MedusaFileDTO? = null
)

data class CreateMedusaPersonDTO(
    val username: String?,
    val fullName: String,
    val mail: String,
    val profilePic: MedusaFileDTO?,
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
    val socials: List<SocialDTO>,
    val mail: String? = null,
    val phone: String? = null,
    val about: String? = null
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

data class  CreateDocumentDTO(
    val fileName: String,
    val driveId: String,
    val content: String
)

data class CreateDocumentsDTO(
    val items: List<CreateDocumentDTO>
)

data class CategoryDTO(
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
    val socialName: String,
    val socialProfileUrl: String
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
    val socials: List<SocialDTO>?
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
        val name: String,
        val score: BigDecimal
)

private val dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd")
