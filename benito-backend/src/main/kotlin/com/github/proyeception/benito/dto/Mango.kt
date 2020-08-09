package com.github.proyeception.benito.dto

import java.time.LocalDate

data class ProjectDTO(
    val id: String,
    val title: String,
    val subtitle: String,
    val description: String,
    val summary: String,
    val creationDate: LocalDate,
    val posterUrl: String,
    val authors: List<PersonDTO>,
    val supervisors: List<PersonDTO>,
    val tags: List<String>
) {
    constructor(medusaProjectDTO: MedusaProjectDTO) : this(
        id = medusaProjectDTO.id,
        title = medusaProjectDTO.title,
        subtitle = medusaProjectDTO.subtitle,
        description = medusaProjectDTO.description,
        summary = medusaProjectDTO.summary,
        creationDate = medusaProjectDTO.creationDate,
        posterUrl = medusaProjectDTO.poster.url,
        authors = medusaProjectDTO.authorRefs.map {
            PersonDTO(
                username = it.username,
                fullName = it.fullName,
                profileUrl = it.profileUrl
            )
        },
        supervisors = medusaProjectDTO.supervisorRefs.map {
            PersonDTO(
                username = it.username,
                fullName = it.fullName,
                profileUrl = it.profileUrl
            )
        },
        tags = emptyList()
    )
}

data class PersonDTO(
    val username: String,
    val fullName: String,
    val profileUrl: String
)