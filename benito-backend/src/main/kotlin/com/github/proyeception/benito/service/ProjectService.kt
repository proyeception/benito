package com.github.proyeception.benito.service

import arrow.core.getOrHandle
import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.client.MedusaGraphClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.exception.FailedDependencyException
import com.github.proyeception.benito.exception.NotFoundException
import com.github.proyeception.benito.extension.asyncIO
import com.github.proyeception.benito.extension.launchIOAsync
import com.github.proyeception.benito.oauth.GoogleDriveClient
import com.github.proyeception.benito.parser.DocumentParser
import com.github.proyeception.benito.storage.DriveStorage
import com.github.proyeception.benito.storage.PermissionsStorage
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.runBlocking
import org.apache.http.entity.ContentType
import org.slf4j.LoggerFactory
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.nio.charset.StandardCharsets
import java.time.LocalDate
import java.time.format.DateTimeFormatter

open class ProjectService(
    private val medusaClient: MedusaClient,
    private val medusaGraphClient: MedusaGraphClient,
    private val documentService: DocumentService,
    private val documentParser: DocumentParser,
    private val fileService: FileService,
    private val keywordService: KeywordService,
    private val statsService: StatsService,
    private val recommendationService: RecommendationService,
    private val googleDriveClient: GoogleDriveClient,
    private val driveStorage: DriveStorage,
    private val permissionsStorage: PermissionsStorage
) {
    open fun closeProject(projectId: String) = mappingFromMedusa {
        medusaClient.updateProjectOpen(projectId, false)
    }
        .also {
            launchIOAsync {
                permissionsStorage.findPermissionsForFile(it.driveFolderId)
                    .map { p ->
                        asyncIO {
                            googleDriveClient.deletePermission(
                                fileId = it.driveFolderId,
                                permissionId = p.permissionId
                            )
                        }
                    }.awaitAll()
            }
        }

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
        page: Int?,
        tag: String?
    ): SearchProjectDTO {


        return if (tag.isNullOrEmpty()) {

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
                page = page ?: 0,
                tag = tag,
                limit = true
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

            SearchProjectDTO(projects, count)
        } else {
            statsService.registerTagSearch(ProjectSearchDTO(
                tag = tag,
                visitedOn = LocalDate.now(),
                categoryId = null
            )
            )
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
                page = page ?: 0,
                tag = tag,
                limit = false
            )
                .getOrHandle {
                    LOGGER.error("Error getting projects from Medusa with Graph")
                    throw FailedDependencyException("Error getting projects from Medusa")
                }
                .map { ProjectDTO(it) }

            //Strapi no soporta queries por graphQL con repeatable components por el momento
            val projectsFilteredByTag = projects.filter { filterByTag(tag, it) }
            val count = projectsFilteredByTag.count()
            val pageSize = 10
            val start = (page ?: 0) * pageSize
            val limit = minOf((start + pageSize - 1), count - 1)
            SearchProjectDTO(projectsFilteredByTag.slice(start..limit), count)
        }
    }

    private fun filterByTag(tag: String, project: ProjectDTO): Boolean = project.tags.any { it.contains(tag) }

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
        val project = medusaClient.findProject(projectId = id)
        launchIOAsync {
            statsService.registerVisit(ProjectVisitDTO(
                projectId = project.id,
                categoryId = project.category.id,
                organizationId = project.organization.id,
                visitedOn = LocalDate.now()
            ))
        }
        project
    }

    fun updateProjectContent(content: UpdateContentDTO, projectId: String): ProjectDTO = mappingFromMedusa {
        medusaClient.updateProjectContent(
            content = content,
            id = projectId
        )
    }
        .also { launchIOAsync { updateProjectKeywords(it) } }

    // Creo que es mejor usar una corrutina para esto, ya son asincrónicas
    open fun updateProjectKeywords(project: ProjectDTO) {
        try {
            val keywords = keywordService.getKeywords(project)
            val updatedKeywords = medusaClient.updateProjectKeywords(keywords, project)
            LOGGER.info("Creating Recommendations for project: ${project.id}")
            recommendationService.recalculateRecommendations(project.id, project.recommendations, updatedKeywords)
        } catch (e: Exception) {
            LOGGER.error("There was an error updating keywords for project ${project.id}")
        }
    }

    open fun addTagsToProjectKeywords(project: ProjectDTO, tags: SetTagsDTO) {
        try {
            val keywordsDeTags = tags.tags.map { KeywordDTO(null, it, 10.0) }
            val updatedKeywords = medusaClient.updateProjectKeywords(keywordsDeTags, project)
            LOGGER.info("Creating Recommendations for project: ${project.id}")
            recommendationService.recalculateRecommendations(project.id, project.recommendations, updatedKeywords)
        } catch (e: Exception) {
            LOGGER.error("There was an error updating keywords for project ${project.id}")
        }
    }

    fun saveDriveDocuments(projectId: String, files: List<Pair<File, String>>) = mappingFromMedusa {
        val docs = runBlocking {
            val (_, driveFolderId) = driveStorage.findOne(projectId)
                ?: throw NotFoundException("No drive for project $projectId")
            files.map { (f, driveId) ->
                asyncIO {
                    val fileStream = f.inputStream()
                    val content = documentParser.parse(fileStream, f.name) ?: ""

                    CreateDocumentDTO(
                        driveId = driveId,
                        content = content,
                        fileName = f.name
                    )
                }
            }.awaitAll()
        }

        medusaClient.saveDocuments(CreateDocumentsDTO(docs), projectId)
    }

    fun saveDocuments(projectId: String, files: List<MultipartFile>): ProjectDTO = mappingFromMedusa {
        val docs = runBlocking {
            val (_, driveFolderId) = driveStorage.findOne(projectId)
                ?: throw NotFoundException("No drive for project $projectId")
            files.map { f ->
                asyncIO {
                    val originalFilename: String? = String(f.originalFilename.toByteArray(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8)
                    val driveId = documentService.saveFile(folderId = driveFolderId, file = f)
                    val fileStream = f.inputStream
                    val content = documentParser.parse(fileStream, originalFilename ?: f.name) ?: ""

                    CreateDocumentDTO(
                        driveId = driveId,
                        content = content,
                        fileName = originalFilename ?: f.name
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

    fun canAuthorEdit(authorId: String, projectId: String): Boolean = findProject(projectId)
        .let { p -> p.authors.any { it.id == authorId } && p.open }

    fun canSupervisorEdit(supervisorId: String, projectId: String) = findProject(projectId)
        .let { p -> p.supervisors.any { it.id == supervisorId } && p.open }

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
        val file = createDriveFolder(project.title)
        val medusaProject = CreateMedusaProjectDTO(
            organization = project.organizationId,
            category = project.categoryId,
            supervisors = listOf(supervisorId),
            title = project.title,
            creationDate = project.creationDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),
            driveFolderId = file.id
        )
        LOGGER.info("{}", medusaProject)
        val medusa = medusaClient.createProject(medusaProject)
        medusa
    }
        .also { launchIOAsync { updateProjectKeywords(it) } }

    private fun createDriveFolder(title: String): GoogleFileDTO = googleDriveClient.createFolder(
        folderName = title.decapitalize().replace("\\s+".toRegex(), "-")
    ).fold(
        ifLeft = { e ->
            LOGGER.error("Failed to create drive folder for project $title", e)
            throw e
        },
        ifRight = { it }
    )

    fun setUsers(projectId: String, users: SetUsersDTO) = mappingFromMedusa {
        medusaClient.modifyProjectUsers(
            projectId = projectId,
            users = users
        )
    }
        .also {
            val driveFolderId = it.driveFolderId

            val permitted = permissionsStorage.findPermissionsForFile(driveFolderId)

            launchIOAsync {
                (it.authors + it.supervisors)
                    .filter { u -> u.mail != null && !u.ghost }
                    .filter { u -> u.id !in permitted.map { p -> p.mail } }
                    .map { u ->
                        asyncIO {
                            googleDriveClient.giveWriterPermission(u.mail!!, driveFolderId)
                                .fold(
                                    ifLeft = { e -> LOGGER.info("Failed to give write permission to ${u.mail}", e) },
                                    ifRight = { p -> permissionsStorage.save(u.mail, p.id, driveFolderId) }
                                )
                        }
                    }.awaitAll()
            }

        }

    private fun mappingFromMedusa(f: () -> MedusaProjectDTO): ProjectDTO = ProjectDTO(f())

    fun recommendedProjects(id: String): List<ProjectDTO> {
        val project = findProject(id)
        return runBlocking {
            project.recommendations
                .take(4)
                .map { asyncIO { findProject(it.projectId) } }.awaitAll()
        }
    }

    fun setTags(projectId: String, tags: SetTagsDTO): ProjectDTO = mappingFromMedusa {
            medusaClient.modifyProjectTags(
                projectId = projectId,
                tags = MedusaSetTagsDTO(tags.tags.map { TagDTO(it, it) })
            )
        }
        .also { launchIOAsync { addTagsToProjectKeywords(it, tags) } }


    companion object {
        private val LOGGER = LoggerFactory.getLogger(ProjectService::class.java)
    }
}
