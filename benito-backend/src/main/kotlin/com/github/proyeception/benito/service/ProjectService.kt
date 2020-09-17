package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.mongodb.MongoTextSearch
import com.github.proyeception.benito.parser.DocumentParser
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.runBlocking
import org.apache.http.entity.ContentType
import org.slf4j.LoggerFactory
import org.springframework.web.multipart.MultipartFile

open class ProjectService(
    private val medusaClient: MedusaClient,
    private val documentService: DocumentService,
    private val documentParser: DocumentParser,
    private val fileService: FileService,
    private val mongoTextSearch: MongoTextSearch
) {
    open fun findProjects(
        orderBy: OrderDTO?,
        from: String?,
        to: String?,
        nameContains: String?,
        category: String?,
        keyword: String?
    ): List<ProjectDTO> {
        return if(keyword.isNullOrEmpty()) {
            medusaClient.findProjects(
                    orderBy = orderBy,
                    from = from,
                    to = to,
                    nameContains = nameContains,
                    category = category
            ).map { ProjectDTO(it) }
        }
        else {
            mongoTextSearch.getDocuments(keyword, from, to, nameContains, category)
        }
    }

    fun featuredProjects(): List<ProjectDTO> = medusaClient.findProjects(
        orderBy = OrderDTO.VIEWS_DESC,
        limit = 10
    ).map { ProjectDTO(it) }

    fun count(): CountDTO = CountDTO(medusaClient.projectCount())

    fun findProject(id: String): ProjectDTO = mappingFromMedusa { medusaClient.findProject(id) }

    fun updateProjectContent(content: UpdateContentDTO, projectId: String) = mappingFromMedusa {
        medusaClient.updateProjectContent(
            content = content,
            id = projectId
        )
    }

    fun saveDocuments(projectId: String, files: List<MultipartFile>): ProjectDTO = mappingFromMedusa {
        val ids = runBlocking {
            files.map { f -> async { documentService.saveFile(projectId = projectId, file = f) } }.awaitAll()
        }

        val docs = runBlocking {
            files.zip(ids).map { (f, driveId) ->
                async {
                    val fileStream = f.inputStream
                    val content = documentParser.parse(fileStream)

                    CreateDocumentDTO(
                        driveId = driveId,
                        content = content,
                        fileName = f.originalFilename ?: f.name
                    )
                }
            }.awaitAll()
        }

        medusaClient.saveDocuments(CreateDocumentsDTO(docs), projectId)
    }

    fun updateProjectImage(id: String, multipart: MultipartFile): ProjectDTO = mappingFromMedusa {
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

    fun hasSupervisor(supervisorId: String, projectId: String) = findProject(projectId)
        .supervisors
        .any { it.id == supervisorId }

    fun deleteDocument(projectId: String, documentId: String): ProjectDTO = mappingFromMedusa {
        medusaClient.deleteDocumentFromProject(
            projectId = projectId,
            documentId = documentId
        )
    }

    fun addAuthors(projectId: String, users: AddUsersDTO): ProjectDTO = mappingFromMedusa {
        medusaClient.addUsersToProject(
            projectId,
            users,
            UserType.AUTHOR
        )
    }

    fun addSupervisors(projectId: String, users: AddUsersDTO): ProjectDTO = mappingFromMedusa {
        medusaClient.addUsersToProject(
            projectId,
            users,
            UserType.SUPERVISOR
        )
    }

    fun deleteAuthors(projectId: String, items: String): ProjectDTO = mappingFromMedusa {
        medusaClient.deleteUsersFromProject(
            projectId,
            items,
            UserType.AUTHOR
        )
    }

    fun deleteSupervisors(projectId: String, items: String): ProjectDTO = mappingFromMedusa {
        medusaClient.deleteUsersFromProject(
            projectId,
            items,
            UserType.SUPERVISOR
        )
    }

    fun createProject(supervisorId: String, project: CreateProjectDTO): ProjectDTO = mappingFromMedusa {
        val medusaProject = CreateMedusaProjectDTO(
            organization = project.organizationId,
            category = project.categoryId,
            supervisors = listOf(supervisorId),
            title = project.title
        )
        LOGGER.info("{}", medusaProject)
        medusaClient.createProject(medusaProject)
    }

    fun setAuthors(projectId: String, users: SetUsersDTO) = mappingFromMedusa {
        medusaClient.modifyProjectUsers(
            projectId = projectId,
            users = users
        )
    }

    private fun mappingFromMedusa(f: () -> MedusaProjectDTO): ProjectDTO = ProjectDTO(f())

    companion object {
        private val LOGGER = LoggerFactory.getLogger(ProjectService::class.java)
    }
}
