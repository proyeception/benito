package com.github.proyeception.benito.dto

import com.fasterxml.jackson.annotation.JsonFormat
import java.time.LocalDate

data class ProjectDTO(
    val id: String,
    val title: String,
    val subtitle: String,
    val description: String,
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    val creationDate: LocalDate,
    val posterUrl: String,
    val authors: List<PersonDTO>,
    val supervisors: List<PersonDTO>,
    val tags: List<String>
)

data class PersonDTO(
    val user: String,
    val profileUrl: String
)