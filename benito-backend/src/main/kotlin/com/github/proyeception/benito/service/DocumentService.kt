package com.github.proyeception.benito.service

import arrow.core.flatMap
import com.github.proyeception.benito.oauth.GoogleDriveOAuthClient
import org.slf4j.LoggerFactory
import org.springframework.web.multipart.MultipartFile

open class DocumentService(
    private val googleClient: GoogleDriveOAuthClient
) {
    fun saveFile(file: MultipartFile, projectId: String, name: String): String {
        LOGGER.info("Creating file $name")

        return googleClient
            .findOrCreateFolder(projectId)
            .flatMap { googleClient.createFile(name, file, it.id) }
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

    fun fileWebContentLink(id: String): String = googleClient.getFile(id)
        .fold(
            ifLeft = {
                LOGGER.error("Error retrieving file $id")
                throw it
            },
            ifRight = {
                LOGGER.info("File $id obtained correctly: ${it.webContentLink}")
                it.webContentLink
                // For some Kotlin reason, using the ?: here will fail to compile
            }
        ) ?: "https://fallback.com"
    // TODO: decide if we want to do something if no web content link is present, or just fail

    companion object {
        private val LOGGER = LoggerFactory.getLogger(DocumentService::class.java)
    }
}