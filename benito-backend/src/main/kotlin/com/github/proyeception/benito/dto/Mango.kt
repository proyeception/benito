package com.github.proyeception.benito.dto

import java.time.LocalDate

data class ProjectDTO(
    val id: String,
    val title: String,
    val description: String,
    val extraContent: String,
    val creationDate: LocalDate,
    val posterUrl: String,
    val authors: List<PersonDTO>,
    val supervisors: List<PersonDTO>,
    val tags: List<String>,
    val documentation: List<FileDTO>
) {
    constructor(medusaProjectDTO: MedusaProjectDTO) : this(
        id = medusaProjectDTO.id,
        title = medusaProjectDTO.title,
        description = medusaProjectDTO.description,
        extraContent = medusaProjectDTO.extraContent.orEmpty(),
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
        tags = emptyList(),
        documentation = medusaProjectDTO.documents.map {
            FileDTO(
                name = it.name,
                driveId = it.driveId
            )
        }
    )
}

data class PersonDTO(
    val username: String,
    val fullName: String,
    val profileUrl: String
)

data class FileDTO(
    val name: String,
    val driveId: String
)