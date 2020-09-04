package com.github.proyeception.benito.dto

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDate

data class MedusaProjectDTO(
    val id: String,
    val title: String,
    val description: String,
    val extraContent: String?,
    val creationDate: LocalDate,
    val poster: MedusaFileDTO,
    val authors: List<PersonRefDTO>,
    val supervisors: List<PersonRefDTO>,
    val documentation: List<DocumentationDTO>,
    val category: CategoryDTO,
    val organization: MedusaOrganizationDTO,
    val tags: List<MedusaTagDTO>
)

data class PersonRefDTO(
    val id: String,
    val username: String?,
    val fullName: String
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
    val profilePic: MedusaFileDTO?,
    val projects: List<MedusaProjectRefDTO>,
    val socials: List<SocialDTO>,
    val mail: String?,
    val phone: String?
)

data class MedusaProjectRefDTO(
    val id: String,
    val title: String,
    val poster: MedusaFileDTO,
    @JsonProperty("organization") val organizationId: String,
    val description: String
)

data class MedusaFileDTO(
    val url: String,
    @JsonProperty("_id") val id: String
)

data class DocumentationDTO(
    @JsonProperty("_id") val id: String,
    val fileName: String,
    val driveId: String
)

data class CreateDocumentDTO(
    val fileName: String,
    val driveId: String,
    val content: String
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
    val icon: MedusaFileDTO
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

data class UpdatePosterDTO(
    val poster: MedusaFileDTO
)
