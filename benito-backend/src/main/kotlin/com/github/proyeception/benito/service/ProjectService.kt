package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.CountDTO
import com.github.proyeception.benito.dto.OrderDTO
import com.github.proyeception.benito.dto.ProjectDTO
import com.github.proyeception.benito.dto.UpdateProjectDTO
import com.github.proyeception.benito.parser.DocumentParser
import org.springframework.web.multipart.MultipartFile

open class ProjectService(
    private val medusaClient: MedusaClient,
    private val documentService: DocumentService,
    private val documentParser: DocumentParser
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

    fun featuredProjects(): List<ProjectDTO> = medusaClient.featuredProjects().map { ProjectDTO(it) }

    fun count(): CountDTO = CountDTO(medusaClient.projectCount())

    fun findProject(id: String): ProjectDTO = ProjectDTO(medusaClient.project(id))

    fun updateProject(u: UpdateProjectDTO, projectId: String) = medusaClient.updateProject(u, projectId)

    fun saveFile(projectId: String, name: String, file: MultipartFile) {
        val fileStream = file.inputStream
        val content = documentParser.parse(fileStream)
        val driveId = documentService.saveFile(projectId = projectId, name = name, file = file)
        medusaClient.saveDocument(projectId, name, driveId, content)
    }

    fun hasAuthor(authorId: String, projectId: String): Boolean = findProject(projectId)
        .authors
        .any { it.id == authorId }

}
