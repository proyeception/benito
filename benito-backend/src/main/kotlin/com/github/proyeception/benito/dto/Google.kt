package com.github.proyeception.benito.dto

data class FileDTO(
    val id: String,
    val name: String,
    val mimeType: String,
    val webContentLink: String?
)

data class FileCreatedDTO(
    val id: String,
    val name: String,
    val mimeType: String
) {
    fun toFile(): FileDTO = FileDTO(
        name = name,
        mimeType = mimeType,
        webContentLink = null,
        id = id
    )
}

data class MetadataDTO(
    val name: String,
    val mimeType: String? = null,
    val parents: List<String>? = null
)

data class QueryDTO(
    val files: List<FileDTO>
)