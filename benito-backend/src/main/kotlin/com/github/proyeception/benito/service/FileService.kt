package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.MedusaFileDTO
import com.github.proyeception.benito.utils.FileHelper
import org.apache.http.entity.ContentType
import org.slf4j.LoggerFactory
import org.springframework.web.multipart.MultipartFile
import java.io.File

open class FileService(
    private val medusaClient: MedusaClient,
    private val fileHelper: FileHelper
) {

    open fun downloadMultipartFile(multipart: MultipartFile, filePath: String): File{
        return fileHelper.downloadMultipartFile(multipart, filePath)
    }

    open fun createMedusaFileFromUpload(
        multipart: MultipartFile,
        filePath: String,
        fileName: String,
        contentType: ContentType
    ): MedusaFileDTO = createMedusaFileDeleting(
        file = fileHelper.downloadMultipartFile(
            multipart = multipart,
            filePath = filePath
        ),
        contentType = contentType,
        fileName = fileName
    )

    open fun createMedusaFileFromUrl(
        url: String,
        filePath: String,
        fileName: String,
        contentType: ContentType
    ): MedusaFileDTO = createMedusaFileDeleting(
        file = fileHelper.downloadFromUrl(
            url = url,
            filePath = filePath
        ),
        contentType = contentType,
        fileName = fileName
    )

    private fun createMedusaFileDeleting(file: File, contentType: ContentType, fileName: String): MedusaFileDTO =
        runCatching {
            LOGGER.info("Create new file $fileName on Medusa")
            medusaClient.createFile(
                file = file,
                filename = fileName,
                contentType = contentType
            )
        }
            .also { fileHelper.deleteFile(file) }
            .getOrThrow()

    private companion object {
        private val LOGGER = LoggerFactory.getLogger(FileService::class.java)
    }
}