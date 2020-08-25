package com.github.proyeception.benito.dto

data class FileDTO(
    val name: String,
    val mimeType: String,
    val webContentLink: String?
)

data class FileCreatedDTO(
    val id: String
)

data class MetadataDTO(
    val name: String
)