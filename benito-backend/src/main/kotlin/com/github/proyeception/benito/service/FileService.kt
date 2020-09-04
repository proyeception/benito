package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.MedusaFileDTO
import com.github.proyeception.benito.utils.FileHelper
import org.apache.http.entity.ContentType
import org.springframework.web.multipart.MultipartFile
import java.nio.file.Files

open class FileService(
    private val medusaClient: MedusaClient,
    private val fileHelper: FileHelper
) {
    open fun createMedusaFileFromUpload(
        multipart: MultipartFile,
        filePath: String,
        fileName: String,
        contentType: ContentType
    ): MedusaFileDTO {
        val file = fileHelper.downloadMultipartFile(
            multipart = multipart,
            filePath = filePath
        )
        try {
            val medusaFile = medusaClient.createFile(
                file = file,
                filename = multipart.originalFilename ?: fileName,
                contentType = contentType
            )
            return medusaFile
        } finally {
            Files.delete(file.toPath())
        }
    }

    open fun createMedusaImageFromUrl(
        url: String,
        filePath: String,
        fileName: String
    ): MedusaFileDTO {
        val image = fileHelper.downloadImage(url, filePath)
        try {
            // It's necessary to leave this in two separate lines, since finally executes before return
            val response = medusaClient.createFile(
                file = image,
                filename = fileName,
                contentType = ContentType.IMAGE_JPEG
            )
            return response
        } finally {
            fileHelper.deleteFile(image)
        }
    }
}