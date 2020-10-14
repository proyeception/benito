package com.github.proyeception.benito.service

import arrow.core.getOrHandle
import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.client.MedusaGraphClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.exception.FailedDependencyException
import com.github.proyeception.benito.mongodb.MongoTextSearch
import com.github.proyeception.benito.parser.DocumentParser
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.runBlocking
import org.apache.http.entity.ContentType
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Async
import org.springframework.web.multipart.MultipartFile
import java.time.format.DateTimeFormatter

open class ProjectService(
    private val medusaClient: MedusaClient,
    private val medusaGraphClient: MedusaGraphClient,
    private val documentService: DocumentService,
    private val documentParser: DocumentParser,
    private val fileService: FileService,
    private val mongoTextSearch: MongoTextSearch,
    private val keywordService: KeywordService,
    private val recommendationService: RecommendationService
) {

    open fun findProjects(
        orderBy: OrderDTO?,
        from: String?,
        to: String?,
        title: String?,
        category: String?,
        keyword: String?,
        authorId: String?,
        authorName: String?,
        organizationId: String?,
        organizationName: String?,
        page: Int?
    ): SearchProjectDTO {
        val projects = medusaGraphClient.findProjects(
            orderBy = orderBy,
            from = from,
            to = to,
            title = title,
            category = category,
            authorId = authorId,
            authorName = authorName,
            keyword = keyword,
            organizationId = organizationId,
            organizationName = organizationName,
            page = page ?: 0
        )
            .getOrHandle {
                LOGGER.error("Error getting projects from Medusa with Graph")
                throw FailedDependencyException("Error getting projects from Medusa")
            }
            .map { ProjectDTO(it) }

        val count: Int = medusaGraphClient.countProjects(
            from = from,
            to = to,
            title = title,
            category = category,
            authorId = authorId,
            authorName = authorName,
            keyword = keyword,
            organizationId = organizationId,
            organizationName = organizationName
        ).getOrHandle {
            LOGGER.error("Error counting projects from Medusa with Graph")
            throw FailedDependencyException("Error counting projects from Medusa")
        }

        return SearchProjectDTO(projects, count)
    }

    fun featuredProjects(): List<ProjectDTO> = medusaGraphClient.findProjects(
        orderBy = OrderDTO.VIEWS_DESC
    )
        .getOrHandle {
            LOGGER.error("Error getting projects from Medusa with Graph")
            throw FailedDependencyException("Error getting projects from Medusa")
        }
        .map { ProjectDTO(it) }

    fun count(): CountDTO = CountDTO(medusaClient.projectCount())

    open fun findProject(id: String): ProjectDTO = mappingFromMedusa {
        medusaClient.findProject(projectId = id)
    }

    fun updateProjectContent(content: UpdateContentDTO, projectId: String): ProjectDTO {
        val updatedProject = mappingFromMedusa {
            medusaClient.updateProjectContent(
                content = content,
                id = projectId
            )
        }
        updateProjectKeywords(updatedProject)
        return updatedProject
    }

    // Creo que es mejor usar una corrutina para esto, ya son asincrónicas
    @Async
    open fun updateProjectKeywords(project: ProjectDTO) {
        try {
            val keywords = keywordService.getKeywords(project)
            val updatedKeywords = medusaClient.updateProjectKeywords(keywords, project)
            recommendationService.recalculateRecommendations(project.id, project.recommendations, updatedKeywords)
        } catch (e: Exception) {
            LOGGER.error("There was an error updating keywords for project ${project.id}")
        }
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
        medusaClient.updateProjectImage(id, UpdatePictureDTO(file))
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
            title = project.title,
            creationDate = project.creationDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        )
        LOGGER.info("{}", medusaProject)
        val medusa = medusaClient.createProject(medusaProject)
        medusa
    }.also { updateProjectKeywords(it) }

    fun setAuthors(projectId: String, users: SetUsersDTO) = mappingFromMedusa {
        medusaClient.modifyProjectUsers(
            projectId = projectId,
            users = users
        )
    }

    private fun mappingFromMedusa(f: () -> MedusaProjectDTO): ProjectDTO = ProjectDTO(f())

    fun recommendedProjects(id: String): List<ProjectDTO> {
        val project = findProject(id)
        return project.recommendations.map { findProject(it.projectId) }.take(4)
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(ProjectService::class.java)
    }
}
