package com.github.proyeception.benito.oauth

import arrow.core.Either
import arrow.core.extensions.fx
import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.connector.OAuthConnector
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.extension.replaceUrlSpaces
import com.github.proyeception.benito.extension.void
import com.github.proyeception.benito.extension.export
import com.github.proyeception.benito.utils.FileHelper
import org.apache.tika.mime.MimeTypes
import org.slf4j.LoggerFactory
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.format.DateTimeFormatter

open class GoogleDriveClient(
    private val googleDriveConnector: OAuthConnector,
    private val objectMapper: ObjectMapper,
    private val fileHelper: FileHelper
) {
    open fun downloadFile(file: GoogleFileDTO): File = file.webContentLink?.let { wcl ->
        val extension = MimeTypes.getDefaultMimeTypes()
            .forName(file.mimeType)
            .extension

        fileHelper.downloadFromUrl(wcl, "/tmp/${file.name}$extension")
    } ?: export(file)

    open fun modifiedFilesSinceIn(parentId: String, modifyDate: LocalDateTime) = this
        .query("'${parentId}' in parents and modifiedTime >= '${modifyDate.format(FORMATTER)}'")

    open fun getFile(fileId: String): Either<Throwable, GoogleFileDTO> = googleDriveConnector.get(
        url = "https://www.googleapis.com/drive/v3/files/$fileId?fields=id,webContentLink,name,mimeType,modifiedTime"
    )
        .map { it.deserializeAs(object : TypeReference<GoogleFileDTO>() {}) }

    open fun createFile(name: String, file: MultipartFile, folderId: String): Either<Throwable, FileCreatedDTO> =
        createFile(metadata = MetadataDTO(name = name, parents = listOf(folderId)), file = file)

    open fun createFolder(folderName: String): Either<Throwable, GoogleFileDTO> {
        LOGGER.info("Creating folder $folderName")

        return Either.fx {
            val res = googleDriveConnector.post(
                url = "https://www.googleapis.com/drive/v3/files?fields=id,name,mimeType,createdTime",
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
            url = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,createdTime",
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

    fun query(query: String): Either<Throwable, List<GoogleFileDTO>> = googleDriveConnector.get(
        url = "https://www.googleapis.com/drive/v3/files?fields=files(id,webContentLink,name,mimeType,modifiedTime)&q=${query.replaceUrlSpaces()}"
    )
        .map { it.deserializeAs(object : TypeReference<QueryDTO>() {}) }
        .map { it.files }

    fun export(file: GoogleFileDTO): File = googleDriveConnector.downloadFile(
        // TODO: parse the mime type a bit to detect xls and ppt
        url = file.export("application/pdf"),
        filePath = "/tmp/${file.id}.pdf"
    )

    companion object {
        private val LOGGER = LoggerFactory.getLogger(GoogleDriveClient::class.java)
        private val FORMATTER = DateTimeFormatter
            .ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
            .withZone(ZoneId.of("UTC"))
    }
}