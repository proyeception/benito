package com.github.proyeception.benito.oauth

import arrow.core.Either
import arrow.core.extensions.fx
import arrow.core.flatMap
import arrow.core.left
import arrow.core.right
import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.connector.OAuthConnector
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.exception.AmbiguousReferenceException
import com.github.proyeception.benito.extension.replaceUrlSpaces
import com.github.proyeception.benito.extension.void
import org.slf4j.LoggerFactory
import org.springframework.web.multipart.MultipartFile

open class GoogleDriveClient(
    private val googleDriveConnector: OAuthConnector,
    private val objectMapper: ObjectMapper
) {
    open fun getFile(fileId: String): Either<Throwable, GoogleFileDTO> = googleDriveConnector.get(
        url = "https://www.googleapis.com/drive/v3/files/$fileId?fields=id,webContentLink,name,mimeType"
    )
        .map { it.deserializeAs(object : TypeReference<GoogleFileDTO>() {}) }

    open fun createFile(name: String, file: MultipartFile, folderId: String): Either<Throwable, FileCreatedDTO> =
        createFile(metadata = MetadataDTO(name = name, parents = listOf(folderId)), file = file)

    open fun createFolder(folderName: String): Either<Throwable, GoogleFileDTO> {
        LOGGER.info("Creating folder $folderName")

        return Either.fx {
            val res = googleDriveConnector.post(
                url = "https://www.googleapis.com/drive/v3/files",
                body = CreateFolderDTO(
                    name = folderName
                )
            ).bind()
            val file = res.deserializeAs(object : TypeReference<FileCreatedDTO>() {})
            makePublic(file.id).bind()
            file.toFile()
        }
    }

    private fun createFile(metadata: MetadataDTO, file: MultipartFile?): Either<Throwable, FileCreatedDTO> {
        val bodyParts = mutableListOf(
            Pair("application/json", objectMapper.writeValueAsBytes(metadata))
        )
        file?.let { bodyParts.add(Pair("multipart/form-data", it.bytes)) }

        return googleDriveConnector.post(
            url = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
            bodyParts = *bodyParts.toTypedArray()
        )
            .map { it.deserializeAs(object : TypeReference<FileCreatedDTO>() {}) }
    }

    open fun deletePermission(
        fileId: String,
        permissionId: String
    ): Either<Throwable, Unit> = googleDriveConnector.delete(
            url = "https://www.googleapis.com/drive/v3/files/$fileId/permissions/$permissionId"
        ).map(void)

    open fun giveWriterPermission(mail: String, fileId: String): Either<Throwable, PermissionDTO> {
        return googleDriveConnector.post(
            url = "https://www.googleapis.com/drive/v3/files/$fileId/permissions",
            body = CreatePermissionDTO(
                role = "writer",
                type = "user",
                emailAddress = mail
            )
        ).map { it.deserializeAs(object : TypeReference<PermissionDTO>() {}) }
    }

    private fun makePublic(fileId: String): Either<Throwable, Unit> {
        return googleDriveConnector.post(
            url = "https://www.googleapis.com/drive/v3/files/$fileId/permissions",
            body = CreatePermissionDTO(
                role = "reader",
                type = "anyone"
            )
        ).map(void)
    }

    open fun findOrCreateFolder(name: String): Either<Throwable, GoogleFileDTO> = query("name = '$name'")
        .flatMap {
            when (it.size) {
                0 -> createFolder(name)
                1 -> it.first().right()
                else -> AmbiguousReferenceException("More than one result found for $name").left()
            }
        }

    fun query(query: String): Either<Throwable, List<GoogleFileDTO>> = googleDriveConnector.get(
        url = "https://www.googleapis.com/drive/v3/files?q=${query.replaceUrlSpaces()}"
    )
        .map { it.deserializeAs(object : TypeReference<QueryDTO>() {}) }
        .map { it.files }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(GoogleDriveClient::class.java)
    }
}