package com.github.proyeception.benito.service

import com.github.proyeception.benito.extension.export
import com.github.proyeception.benito.oauth.GoogleDriveClient
import org.slf4j.LoggerFactory
import org.springframework.web.multipart.MultipartFile

open class DocumentService(
    private val googleClient: GoogleDriveClient
) {
    open fun saveFile(file: MultipartFile, folderId: String): String {
        LOGGER.info("Creating file ${file.originalFilename}")

        return googleClient
            .createFile(file.originalFilename ?: file.name, file, folderId)
            .fold(
                ifLeft = {
                    LOGGER.error("Error creating file ${file.originalFilename}", it)
                    throw it
                },
                ifRight = {
                    LOGGER.info("File ${file.originalFilename} created successfully with id ${it.id}")
                    it.id
                }
            )
    }

    open fun downloadUrl(id: String): String = googleClient.getFile(id)
        .fold(
            ifLeft = {
                LOGGER.error("Error retrieving file $id")
                throw it
            },
            ifRight = {
                LOGGER.info("File $id obtained correctly: ${it.webContentLink}")
                val file = it.webContentLink ?: it.export("application/pdf")
                file
                // For some Kotlin reason, using the ?: here will fail to compile
            }
        )

    companion object {
        private val LOGGER = LoggerFactory.getLogger(DocumentService::class.java)
    }
}