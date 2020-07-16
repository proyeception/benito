package com.github.proyeception.benito.dto

import java.time.LocalDateTime

data class ProjectDTO(
    val id: String,
    val title: String,
    val subtitle: String,
    val description: String,
    val creationDate: LocalDateTime,
    val posterUrl: String,
    val authors: List<PersonDTO>,
    val supervisors: List<PersonDTO>,
    val tags: List<String>
)

data class PersonDTO(
    val username: String,
    val profileUrl: String
)