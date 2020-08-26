package com.github.proyeception.benito.dto

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDate

data class MedusaProjectDTO(
    @JsonProperty("_id") val id: String,
    val title: String,
    val description: String,
    val extraContent: String?,
    val creationDate: LocalDate,
    val poster: PosterDTO,
    val authorRefs: List<PersonRefDTO>,
    val supervisorRefs: List<PersonRefDTO>,
    val documentation: List<DocumentationDTO>,
    val category: CategoryDTO
)

data class PersonRefDTO(
    @JsonProperty("_id") val id: String,
    val username: String,
    val profileUrl: String,
    val fullName: String
)

data class PosterDTO(
    val url: String
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

data class OrganizationDTO(
    val displayName: String,
    val name: String
)

data class ProjectRefDTO(
    val projectId: String,
    val projectName: String
)
