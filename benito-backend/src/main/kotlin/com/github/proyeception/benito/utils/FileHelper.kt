package com.github.proyeception.benito.utils

import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.net.URL
import java.nio.file.Files
import java.nio.file.Paths

open class FileHelper {
    open fun createFile(path: String) = File(path)

    open fun downloadMultipartFile(multipart: MultipartFile, filePath: String): File =
        File(filePath).also { multipart.transferTo(it) }

    open fun downloadImage(url: String, filePath: String): File {
        val input = URL(url).openStream()
        val pathToFile = Paths.get(filePath)
        Files.copy(input, pathToFile)

        return pathToFile.toFile()
    }

    open fun deleteFile(file: File) = Files.delete(file.toPath())
}