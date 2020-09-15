package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.parser.DocumentParser
import kotlinx.coroutines.*
import org.apache.http.entity.ContentType
import org.slf4j.LoggerFactory
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
    ).let { ProjectDTO(it) }

    fun saveDocuments(projectId: String, files: List<MultipartFile>): ProjectDTO {
        val ids = runBlocking {
            files.map { f -> async { documentService.saveFile(projectId = projectId, file = f) } }.awaitAll()
        }

        val docs = runBlocking {
            files.mapIndexed { i, f ->
                async {
                    val fileStream = f.inputStream
                    val content = documentParser.parse(fileStream)
                    val driveId = ids[i]

                    CreateDocumentDTO(
                        driveId = driveId,
                        content = content,
                        fileName = f.originalFilename ?: f.name
                    )
                }
            }.awaitAll()
        }

        return ProjectDTO(medusaClient.saveDocuments(CreateDocumentsDTO(docs), projectId))
    }

    private fun saveDocument(projectId: String, file: MultipartFile): ProjectDTO {
        val fileStream = file.inputStream
        val content = documentParser.parse(fileStream)
        val driveId = documentService.saveFile(projectId = projectId, file = file)

        return medusaClient.saveDocument(
            projectId,
            file.originalFilename ?: file.name,
            driveId,
            content
        ).let { ProjectDTO(it) }
    }

    fun updateProjectImage(id: String, multipart: MultipartFile): ProjectDTO {
        val file = fileService.createMedusaFileFromUpload(
            multipart = multipart,
            contentType = ContentType.IMAGE_JPEG,
            filePath = "/tmp/$id.jpg",
            fileName = multipart.originalFilename ?: "$id.jpg"
        )
        return ProjectDTO(medusaClient.updateProjectImage(id, UpdatePosterDTO(file)))
    }

    fun hasAuthor(authorId: String, projectId: String): Boolean = findProject(projectId)
        .authors
        .any { it.id == authorId }

    fun hasSupervisor(supervisorId: String, projectId: String) = findProject(projectId)
        .supervisors
        .any { it.id == supervisorId }

    fun deleteDocument(projectId: String, documentId: String): ProjectDTO = medusaClient.deleteDocumentFromProject(
        projectId = projectId,
        documentId = documentId
    ).let { ProjectDTO(it) }

    fun addAuthors(projectId: String, users: AddUsersDTO): ProjectDTO = medusaClient.addUsersToProject(
        projectId,
        users,
        UserType.AUTHOR
    ).let { ProjectDTO(it) }

    fun addSupervisors(projectId: String, users: AddUsersDTO): ProjectDTO = medusaClient.addUsersToProject(
        projectId,
        users,
        UserType.SUPERVISOR
    ).let { ProjectDTO(it) }

    fun deleteAuthors(projectId: String, items: String): ProjectDTO = medusaClient.deleteUsersFromProject(
        projectId,
        items,
        UserType.AUTHOR
    ).let { ProjectDTO(it) }

    fun deleteSupervisors(projectId: String, items: String): ProjectDTO = medusaClient.deleteUsersFromProject(
        projectId,
        items,
        UserType.SUPERVISOR
    ).let { ProjectDTO(it) }

    fun createProject(supervisorId: String, project: CreateProjectDTO): ProjectDTO {
        val medusaProject = CreateMedusaProjectDTO(
            organization = project.organizationId,
            category = project.categoryId,
            supervisors = listOf(supervisorId),
            title = project.title
        )
        LOGGER.info("{}", medusaProject)
        return ProjectDTO(medusaClient.createProject(medusaProject))
    }

    fun setAuthors(projectId: String, users: SetUsersDTO) = medusaClient.modifyProjectUsers(
        projectId = projectId,
        users = users
    ).let { ProjectDTO(it) }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(ProjectService::class.java)
    }
}
