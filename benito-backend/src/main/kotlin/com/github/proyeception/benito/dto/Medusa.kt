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
    val authorRefs: List<AuthorDTO>,
    val supervisorRefs: List<SupervisorDTO>,
    val documentation: List<DocumentationDTO>,
    val category: CategoryDTO
)

data class AuthorDTO(
    @JsonProperty("_id") val id: String,
    val username: String,
    val profileUrl: String,
    val fullName: String
)

data class SupervisorDTO(
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
        val fileName: String
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