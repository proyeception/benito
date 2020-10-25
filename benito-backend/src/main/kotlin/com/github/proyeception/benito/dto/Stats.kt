package com.github.proyeception.benito.dto

import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate

@Document(collection="project_visit")
data class ProjectVisitDTO(
    val projectId: String,
    val categoryId: String,
    val organizationId: String,
    val visitedOn: LocalDate
)

@Document(collection="project_search")
data class ProjectSearchDTO(
    val tag: String,
    val categoryId: String,
    val visitedOn: LocalDate
)

data class OrganizationQuantityDTO(
    val organization: String,
    val quantity: Int
)

data class ProjectCreationTimelineDTO(
    val categoryId: String,
    var quantities: List<ProjectYearsDTO>
)

data class ProjectYearsDTO(
    val year: Int,
    val quantity: Int
)