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

data class OrganizationQuantityResultDTO(
    val result: List<OrganizationQuantityDTO>
)

data class OrganizationQuantityDTO(
    val organizationId: String,
    val quantity: Int
)