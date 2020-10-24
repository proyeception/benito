package com.github.proyeception.benito.utils

import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.io.InputStream
import java.net.URL
import java.nio.file.Files
import java.nio.file.Paths

open class FileHelper {
    open fun downloadMultipartFile(multipart: MultipartFile, filePath: String): File = createFileFromInputStream(
        filePath = filePath,
        input = multipart.inputStream
    )

    open fun downloadFromUrl(url: String, filePath: String): File {
        val input = URL(url).openStream()
        return createFileFromInputStream(filePath = filePath, input = input)
    }

    open fun deleteFile(file: File) = Files.delete(file.toPath())

    fun createFileFromInputStream(filePath: String, input: InputStream): File {
        val pathToFile = Paths.get(filePath)
        Files.copy(input, pathToFile)

        return pathToFile.toFile()
    }
}