package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.OrderDTO
import com.github.proyeception.benito.dto.ProjectDTO
import org.apache.commons.io.FilenameUtils
import org.apache.tika.metadata.Metadata
import org.apache.tika.parser.AutoDetectParser
import org.apache.tika.sax.BodyContentHandler
import org.springframework.web.multipart.MultipartFile

open class ProjectService(
    private val medusaClient: MedusaClient
) {
    open fun findProjects(
        orderBy: OrderDTO?,
        from: String?,
        to: String?,
        nameContains: String?,
        tags: String?
    ): List<ProjectDTO> {
        return medusaClient.getProjects(orderBy, from, to, nameContains, tags).map { ProjectDTO(it) }
    }

    fun findProject(id: String): ProjectDTO {
        return ProjectDTO(medusaClient.project(id))
    }

    fun saveFile(projectId: String, name: String, file: MultipartFile) {

        val parser = AutoDetectParser()
        val handler = BodyContentHandler()
        val metadata = Metadata()
        parser.parse(file.inputStream, handler, metadata)

        val extension = FilenameUtils.getExtension(file.originalFilename)
        val content = getContent(handler.toString(), extension)

        val driveId = saveFileToGoogleDrive(projectId, name, file)
        medusaClient.saveFile(projectId, name, driveId, file)

    }

    private fun saveFileToGoogleDrive(projectId: String, name: String, file: Any): String {
        //TODO
        return "string"
    }

    private fun getContent(content: String, extension: String): String {

        var result: String = ""
        var sheets: String = ""
        result = when (extension) {
            "docx" -> splitBetweenRegex("word/document.xml", Regex("\n\n"), content)
            "xlsx" -> {
                var result = StringBuilder()
                var remainingString = content
                while (!remainingString.isBlank()) {
                    if (remainingString.contains("xl/worksheets/sheet")) {
                        val slide = splitBetweenRegex("xl/worksheets/sheet", Regex("\n\n"), remainingString)
                        val regex = Regex("\\d+[.]xml")
                        val res = slide.replace(regex, "")

                        remainingString = remainingString.split("xl/worksheets/sheet", ignoreCase = false, limit = 2)[1]

                        result.append(res)
                    } else {
                        remainingString = ""
                    }
                }
                var sharedStrings = splitBetween("xl/sharedStrings.xml", "xl/worksheets/_rels/", content)
                result.append(sharedStrings).toString().toString()

            }
            "pptx" -> {
                var result = StringBuilder()
                var remainingString = content
                while (!remainingString.isBlank()) {
                    if (remainingString.contains("ppt/slides/slide")) {
                        val slide = splitBetweenRegex("ppt/slides/slide", Regex("\n\n"), remainingString)
                        val regex = Regex("\\d+[.]xml")
                        val res = slide.replace(regex, "")

                        remainingString = remainingString.split("ppt/slides/slide", ignoreCase = false, limit = 2)[1]

                        result.append(res)
                    } else {
                        remainingString = ""
                    }
                }
                result.toString()
            }
            else -> content
        }
        print(result)
        return result

    }

    private fun splitBetweenRegex(string: String, regex: Regex, content: String): String {
        return content.split(string)[1].split(regex)[0]
    }

    private fun splitBetween(string1: String, string2: String, content: String): String {
        return content.split(string1)[1].split(string2)[0]
    }
}