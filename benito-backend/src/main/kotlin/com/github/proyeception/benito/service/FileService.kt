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
        contentType: ContentType
    ): MedusaFileDTO {
        val file = fileHelper.createFile("/tmp/${multipart.originalFilename}")
        try {
            fileHelper.downloadMultipartFile(multipart, multipart.originalFilename!!)
            multipart.transferTo(file)
            val medusaFile = medusaClient.createFile(file, multipart.originalFilename!!, contentType)
            return medusaFile
        } finally {
            Files.delete(file.toPath())
        }
    }

    open fun createMedusaImageFromUrl(
        url: String,
        filename: String
    ): MedusaFileDTO {
        val image = fileHelper.downloadImage(url, filename)
        try {
            // It's necessary to leave this in two separate lines, since finally executes before return
            val response = medusaClient.createFile(
                file = image,
                filename = filename,
                contentType = ContentType.IMAGE_JPEG
            )
            return response
        } finally {
            fileHelper.deleteFile(image)
        }
    }
}