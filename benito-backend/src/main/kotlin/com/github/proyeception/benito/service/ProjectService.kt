package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.CountDTO
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
        category: String?
    ): List<ProjectDTO> = medusaClient.getProjects(
        orderBy = orderBy,
        from = from,
        to = to,
        nameContains = nameContains,
        category = category
    ).map { ProjectDTO(it) }

    fun top10Projects(): List<ProjectDTO> = medusaClient.top10Projects().map { ProjectDTO(it) }

    fun count(): CountDTO = CountDTO(medusaClient.projectCount())

    fun findProject(id: String): ProjectDTO {
        return ProjectDTO(medusaClient.project(id))
    }

    fun saveFile(projectId: String, name: String, file: MultipartFile) {
        val parser = AutoDetectParser()
        val handler = BodyContentHandler()
        val metadata = Metadata()
        parser.parse(file.inputStream, handler, metadata)
        val content = handler.toString()

        val extension = FilenameUtils.getExtension(file.originalFilename)

        val driveId = saveFileToGoogleDrive(projectId, name, file)
        medusaClient.saveFile(projectId, name, driveId, content)
    }

    private fun saveFileToGoogleDrive(projectId: String, name: String, file: Any): String {
        //TODO
        return "string"
    }
}
