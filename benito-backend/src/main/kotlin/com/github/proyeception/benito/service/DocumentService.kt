package com.github.proyeception.benito.service

import com.github.proyeception.benito.oauth.GoogleDriveOAuthClient
import org.slf4j.LoggerFactory
import org.springframework.web.multipart.MultipartFile

class DocumentService(
    private val googleClient: GoogleDriveOAuthClient
) {
    fun saveFile(file: MultipartFile, projectId: String, name: String): String {
        LOGGER.info("Creating file $name")
        return googleClient.createFile(
            name = name,
            file = file,
            projectId = projectId
        )
            .fold(
                ifLeft = {
                    LOGGER.error("Error creating file $name", it)
                    throw it
                },
                ifRight = {
                    LOGGER.info("File $name created successfully with id ${it.id}")
                    it.id
                }
            )
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(DocumentService::class.java)
    }
}