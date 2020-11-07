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
import org.apache.pdfbox.pdmodel.PDDocument
import org.apache.pdfbox.rendering.ImageType
import org.apache.pdfbox.rendering.PDFRenderer
import org.slf4j.LoggerFactory
import org.springframework.mock.web.MockMultipartFile
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.io.IOException
import java.nio.charset.StandardCharsets
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*
import javax.imageio.ImageIO


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
    private val permissionsStorage: PermissionsStorage,
    private val categoriesService: CategoriesService
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
        medusaClient.findProject(projectId = id)
    }

    open fun registerView(project: ProjectDTO) {
        launchIOAsync {
            val categoryId = categoriesService
                .categories()
                .find {it.name == project.category}!!
                .id
            statsService.registerVisit(ProjectVisitDTO(
                projectId = project.id,
                categoryId = categoryId,
                organizationId = project.organization.id,
                visitedOn = LocalDate.now()
            ))
        }
    }

    fun updateProjectContent(content: UpdateContentDTO, projectId: String): ProjectDTO = mappingFromMedusa {
        LOGGER.info("Updating project $projectId: {}", content)

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

    fun saveDocuments(projectId: String, files: List<MultipartFile>): ProjectDTO = mappingFromMedusa {
        val docs = runBlocking {
            val (_, driveFolderId) = driveStorage.findOne(projectId)
                ?: throw NotFoundException("No drive for project $projectId")
            files.map { f ->
                asyncIO {
                    val originalFilename: String? = fixMarks(f.originalFilename)
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
        val medusaFile = if (multipart.contentType == "application/pdf") {
            val random = UUID.randomUUID().toString()
            turnPdfIntoJpg(multipart, random, id)
        } else {
            fileService.createMedusaFileFromUpload(
                multipart = multipart,
                contentType = ContentType.IMAGE_JPEG,
                filePath = "/tmp/$id.jpg",
                fileName = multipart.originalFilename ?: "$id.jpg"
            )
        }
        medusaClient.updateProjectImage(id, UpdatePictureDTO(medusaFile))
    }

    fun uploadPictureToMedusa(multipart: MultipartFile): MedusaFileDTO {
        val random = UUID.randomUUID()
        val file = fileService.createMedusaFileFromUpload(
            multipart = multipart,
            contentType = ContentType.IMAGE_JPEG,
            filePath = "/tmp/$random.jpg",
            fileName = multipart.originalFilename ?: "$random.jpg"
        )
        return file
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
        LOGGER.info("Create project: {}", project)
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
        ifRight = {
            LOGGER.info("Created folder $title in drive")
            it
        }
    )

    fun setUsers(projectId: String, users: SetUsersDTO) = mappingFromMedusa {
        LOGGER.info("Set project $projectId users to {}", users)
        medusaClient.modifyProjectUsers(
            projectId = projectId,
            users = users.copy(
                authors = users.authors.distinct(),
                supervisors = users.supervisors.distinct()
            )
        )
    }
        .also {
            launchIOAsync {
                val driveFolderId = it.driveFolderId

                val permitted = permissionsStorage.findPermissionsForFile(driveFolderId)

                (it.authors + it.supervisors)
                    .filter { u -> !u.ghost }
                    .filter { u -> u.mail !in permitted.map { p -> p.mail } }
                    .map { u ->
                        asyncIO {
                            if (u.mail != null) {
                                googleDriveClient.giveWriterPermission(u.mail, driveFolderId)
                                    .fold(
                                        ifLeft = { e -> LOGGER.warn("Failed to give write permission to ${u.mail}", e) },
                                        ifRight = { p ->
                                            LOGGER.info("Gave write permission ${u.mail} ${it.title}")
                                            permissionsStorage.save(u.mail, p.id, driveFolderId)
                                        }
                                    )
                            }
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

    fun fixMarks(string: String?): String {
        return String(string!!.toByteArray(StandardCharsets.ISO_8859_1), StandardCharsets.ISO_8859_1)
    }

    fun getPdfAsJpgUrl(image: MultipartFile): MedusaFileDTO {
        val randomOrigin = UUID.randomUUID()
        val randomDestination = UUID.randomUUID()
        return turnPdfIntoJpg(image, randomOrigin.toString(), randomDestination.toString())
    }

    fun turnPdfIntoJpg(image: MultipartFile, randomOrigin: String, randomDestination: String): MedusaFileDTO {
        val sourceDir = "/tmp/${fixMarks(image.originalFilename)}${randomOrigin}original.jpg"
        val destinationDir = "/tmp/${fixMarks(image.originalFilename)}${randomDestination}converted.jpg"
        val file = fileService.downloadMultipartFile(image, sourceDir)

        val destinationFile = File(destinationDir)
        if (!destinationFile.exists()) {
            destinationFile.mkdir()
        }
        if (file.exists()) {
            val document = PDDocument.load(file)
            val pdfRenderer = PDFRenderer(document)
            val fileName = file.name.replace(".pdf", "")
            val fileExtension = "png"
            val dpi = 300
            val outputUrl = destinationDir + fileName + "_" + (1) + "." + fileExtension
            val outPutFile = File(outputUrl)
            val bImage = pdfRenderer.renderImageWithDPI(0, dpi.toFloat(), ImageType.RGB)
            ImageIO.write(bImage, fileExtension, outPutFile)

            val path: Path = Paths.get(outputUrl)
            val contentType = "image/jpeg"
            var content: ByteArray? = null
            try {
                content = Files.readAllBytes(path)
            } catch (e: IOException) {
            }
            val result: MultipartFile = MockMultipartFile(fileName,
                fileName, contentType, content)
            document.close()

            return uploadPictureToMedusa(result)

        } else {
            throw FailedDependencyException("Error uploading pdf as jpg to Medusa")
        }
    }


    companion object {
        private val LOGGER = LoggerFactory.getLogger(ProjectService::class.java)
    }
}
