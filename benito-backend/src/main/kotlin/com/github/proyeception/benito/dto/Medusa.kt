package com.github.proyeception.benito.dto

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDate

data class MedusaProjectDTO(
    @JsonProperty("_id") val id: String,
    val title: String,
    val subtitle: String,
    val summary: String,
    val description: String,
    val creationDate: LocalDate,
    val poster: PosterDTO,
    val authorRefs: List<AuthorDTO>,
    val supervisorRefs: List<SupervisorDTO>
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

enum class MedusaFilter(val filterName: String) {
    GREATER_OR_EQUAL("gte"),
    LESS_OR_EQUAL("lte"),
    CONTAINS("contains"),
    IN("in"),
}