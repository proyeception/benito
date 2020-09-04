package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.parser.DocumentParser
import org.apache.http.entity.ContentType
import org.springframework.web.multipart.MultipartFile

open class ProjectService(
    private val medusaClient: MedusaClient,
    private val documentService: DocumentService,
    private val documentParser: DocumentParser,
    private val fileService: FileService
) {
    open fun findProjects(
        orderBy: OrderDTO?,
        from: String?,
        to: String?,
        nameContains: String?,
        category: String?
    ): List<ProjectDTO> = medusaClient.findProjects(
        orderBy = orderBy,
        from = from,
        to = to,
        nameContains = nameContains,
        category = category
    ).map { ProjectDTO(it) }

    fun featuredProjects(): List<ProjectDTO> = medusaClient.findProjects(
        orderBy = OrderDTO.VIEWS_DESC,
        limit = 10
    ).map { ProjectDTO(it) }

    fun count(): CountDTO = CountDTO(medusaClient.projectCount())

    fun findProject(id: String): ProjectDTO = ProjectDTO(medusaClient.findProject(id))

    fun updateProjectContent(content: UpdateContentDTO, projectId: String) = medusaClient.updateProjectContent(
        content = content,
        id = projectId
    )

    fun saveDocument(projectId: String, name: String, file: MultipartFile) {
        val fileStream = file.inputStream
        val content = documentParser.parse(fileStream)
        val driveId = documentService.saveFile(projectId = projectId, name = name, file = file)
        medusaClient.saveDocument(projectId, name, driveId, content)
    }

    fun updateProjectImage(id: String, multipart: MultipartFile) {
        val file = fileService.createMedusaFileFromUpload(
            multipart = multipart,
            contentType = ContentType.IMAGE_JPEG,
            filePath = "/tmp/$id.jpg",
            fileName = multipart.originalFilename ?: "$id.jpg"
        )
        medusaClient.updateProjectImage(id, UpdatePosterDTO(file))
    }

    fun hasAuthor(authorId: String, projectId: String): Boolean = findProject(projectId)
        .authors
        .any { it.id == authorId }
}
