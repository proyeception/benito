package com.github.proyeception.benito.dto

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDate

data class MedusaProjectDTO(
    val id: String,
    val title: String,
    val description: String,
    val extraContent: String?,
    val creationDate: LocalDate,
    val poster: ImageDTO,
    val authors: List<PersonRefDTO>,
    val supervisors: List<PersonRefDTO>,
    val documentation: List<DocumentationDTO>,
    val category: CategoryDTO,
    val organization: MedusaOrganizationDTO,
    val tags: List<MedusaTagDTO>
)

data class PersonRefDTO(
    val id: String,
    val username: String,
    val fullName: String
)

data class MedusaPersonDTO(
    val id: String,
    val username: String,
    val fullName: String,
    val organizations: List<MedusaOrganizationDTO>,
    val profilePic: ImageDTO?,
    val projects: List<ProjectRefDTO>,
    val socials: List<SocialDTO>
)

data class ProjectRefDTO(
    val id: String,
    val title: String,
    val poster: ImageDTO,
    @JsonProperty("organization") val organizationId: String
)

data class ImageDTO(
    val url: String,
    val name: String
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
    val displayName: String,
    val name: String,
    val icon: ImageDTO
)

data class MedusaTagDTO(
    val tagName: String,
    val displayName: String
)

data class SocialDTO(
    val socialName: String,
    val socialProfileUrl: String
)
