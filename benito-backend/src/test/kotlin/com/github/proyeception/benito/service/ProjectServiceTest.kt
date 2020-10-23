package com.github.proyeception.benito.service

import arrow.core.right
import com.github.proyeception.benito.Spec
import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.client.MedusaGraphClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.mock.eq
import com.github.proyeception.benito.mock.getMock
import com.github.proyeception.benito.mock.on
import com.github.proyeception.benito.oauth.GoogleDriveClient
import com.github.proyeception.benito.parser.DocumentParser
import com.github.proyeception.benito.storage.Drive
import com.github.proyeception.benito.storage.DriveStorage
import com.nhaarman.mockito_kotlin.any
import io.kotlintest.matchers.shouldBe
import org.mockito.Mockito.verify
import org.springframework.web.multipart.MultipartFile
import java.io.InputStream
import java.time.LocalDate

class ProjectServiceTest : Spec() {
    init {
        val medusaClient: MedusaClient = getMock()
        val documentParserMock: DocumentParser = getMock()
        val documentService: DocumentService = getMock()
        val fileServiceMock: FileService = getMock()
        val medusaGraphClientMock: MedusaGraphClient = getMock()
        val keywordService = KeywordService()
        val recommendationService: RecommendationService = getMock()
        val driveClientMock: GoogleDriveClient = getMock()
        val driveStorageMock: DriveStorage = getMock()
        val projectService = ProjectService(
            medusaClient = medusaClient,
            documentParser = documentParserMock,
            documentService = documentService,
            fileService = fileServiceMock,
            medusaGraphClient = medusaGraphClientMock,
            keywordService = keywordService,
            recommendationService = recommendationService,
            driveStorage = driveStorageMock,
            googleDriveClient = driveClientMock
        )

        "projects" should {
            "return list of projects" {

                val author = MedusaPersonRefDTO(
                    id = "123",
                    fullName = "Benito Quinquela",
                    username = "author"
                )

                val supervisor = MedusaPersonRefDTO(
                    id = "123",
                    fullName = "Jorge Luis Borges",
                    username = "supervisor"
                )

                val documentation = DocumentationDTO(
                    id = "asd",
                    fileName = "Acta de proyecto",
                    driveId = "123"
                )

                val project = ProjectDTO(
                    id = "1",
                    title = "project title",
                    description = "project description",
                    extraContent = "nicely formatted content",
                    creationDate = LocalDate.of(2020, 2, 6),
                    pictureUrl = "",
                    authors = listOf(
                        PersonRefDTO(
                            id = "123",
                            username = "author",
                            fullName = "Benito Quinquela"
                        )
                    ),
                    supervisors = listOf(
                        PersonRefDTO(
                            id = "123",
                            username = "supervisor",
                            fullName = "Jorge Luis Borges"
                        )
                    ),
                    tags = emptyList(),
                    documentation = listOf(documentation),
                    organization = OrganizationRefDTO(
                        id = "123",
                        displayName = "UTN FRBA"
                    ),
                        recommendations = emptyList(),
                        project_keywords = emptyList()
                )

                val newProject = MedusaProjectDTO(
                    id = "1",
                    title = "project title",
                    description = "project description",
                    extraContent = "nicely formatted content",
                    creationDate = LocalDate.of(2020, 2, 6),
                    picture = MedusaFileDTO(url = "", id = ""),
                    authors = listOf(author),
                    supervisors = listOf(supervisor),
                    documentation = listOf(documentation),
                    category = CategoryDTO(
                        id = "1",
                        name = "Systems",
                        tagName = "systems",
                        imageUrl = ""
                    ),
                    organization = MedusaOrganizationDTO(
                        displayName = "UTN FRBA",
                        name = "utnfrba",
                        icon = MedusaFileDTO(
                            id = "icon",
                            url = "icon"
                        ),
                        id = "123",
                        authors = emptyList(),
                        supervisors = emptyList()
                    ),
                    tags = emptyList(),
                    recommendations = emptyList(),
                    project_keywords = emptyList()
                )

                val projects = listOf(newProject)
                val expected = listOf(project)

                on(medusaGraphClientMock.findProjects()).thenReturn(projects.right())
                on(medusaGraphClientMock.countProjects()).thenReturn(1.right())

                val actual = projectService.findProjects(
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                )

                expected shouldBe actual.projects
            }
        }

        "project" should {
            "should return a specific project" {
                val author = MedusaPersonRefDTO(
                    id = "123",
                    fullName = "Benito Quinquela",
                    username = "author"
                )

                val supervisor = MedusaPersonRefDTO(
                    id = "123",
                    fullName = "Jorge Luis Borges",
                    username = "supervisor"
                )

                val documentation = DocumentationDTO(
                    id = "asd",
                    fileName = "Acta de proyecto",
                    driveId = "123"
                )

                val project = ProjectDTO(
                    id = "1",
                    title = "project title",
                    description = "project description",
                    extraContent = "nicely formatted content",
                    creationDate = LocalDate.of(2020, 2, 6),
                    pictureUrl = "",
                    authors = listOf(
                        PersonRefDTO(
                            id = "123",
                            username = "author",
                            fullName = "Benito Quinquela"
                        )
                    ),
                    supervisors = listOf(
                        PersonRefDTO(
                            id = "123",
                            username = "supervisor",
                            fullName = "Jorge Luis Borges"
                        )
                    ),
                    tags = emptyList(),
                    documentation = listOf(documentation),
                    organization = OrganizationRefDTO(
                        id = "123",
                        displayName = "UTN FRBA"
                    ),
                        recommendations = emptyList(),
                        project_keywords = emptyList()
                )

                val newProject = MedusaProjectDTO(
                    id = "1",
                    title = "project title",
                    description = "project description",
                    extraContent = "nicely formatted content",
                    creationDate = LocalDate.of(2020, 2, 6),
                    picture = MedusaFileDTO(url = "", id = ""),
                    authors = listOf(author),
                    supervisors = listOf(supervisor),
                    documentation = listOf(documentation),
                    category = CategoryDTO("1","Systems", "systems", ""),
                    organization = MedusaOrganizationDTO(
                        displayName = "UTN FRBA",
                        name = "utnfrba",
                        icon = MedusaFileDTO(
                            id = "icon",
                            url = "icon"
                        ),
                        id = "123",
                        authors = emptyList(),
                        supervisors = emptyList()
                    ),
                    tags = emptyList(),
                    recommendations = emptyList(),
                    project_keywords = emptyList()
                )

                val projectResult = newProject
                val expected = project

                on(medusaClient.findProject("1")).thenReturn(projectResult)

                val actual = projectService.findProject("1")

                expected shouldBe actual

                verify(medusaClient).findProject("1")
            }
        }

        "saveDocument" should {
            "pass the original file to the DocumentService, parse its content and upload it to Medusa" {
                val multipartMock: MultipartFile = getMock()
                on(multipartMock.originalFilename).thenReturn("file.pdf")
                val project = MedusaProjectDTO(
                    id = "123",
                    title = "Some title",
                    description = "Some description",
                    extraContent = "Some extra content",
                    creationDate = LocalDate.now(),
                    picture = null,
                    authors = emptyList(),
                    supervisors = emptyList(),
                    documentation = emptyList(),
                    category = CategoryDTO(id = "1", name = "utn", tagName = "UTN", imageUrl = "https://image.com"),
                    organization = MedusaOrganizationDTO(
                        id = "123",
                        displayName = "Some org",
                        name = "someorg",
                        icon = MedusaFileDTO(
                            url = "https://icon.ico",
                            id = "123"
                        ),
                        supervisors = emptyList(),
                        authors = emptyList()
                    ),
                    tags = emptyList(),
                    recommendations = emptyList(),
                    project_keywords = emptyList()
                )

                val inputMock: InputStream = getMock()
                on(driveStorageMock.findOne(any())).thenReturn(Drive("456", "123"))
                on(multipartMock.inputStream).thenReturn(inputMock)
                on(documentParserMock.parse(eq(inputMock), any())).thenReturn("asd")
                on(documentService.saveFile(
                    file = eq(multipartMock),
                    folderId = eq("123")
                )).thenReturn("456")
                on(medusaClient.saveDocuments(
                    docs = eq(
                        CreateDocumentsDTO(
                            items = listOf(
                                CreateDocumentDTO(
                                    fileName = "file.pdf",
                                    driveId = "456",
                                    content = "asd"
                                )
                            )
                        )
                    ),
                    projectId = eq("123")
                )).thenReturn(project)

                projectService.saveDocuments("123", listOf(multipartMock))
            }
        }

        "updateProjectImage" should {
            "create the file in Medusa and then update the project" {
                val multipartMock: MultipartFile = getMock()
                on(multipartMock.originalFilename).thenReturn("file.jpg")
                val project = MedusaProjectDTO(
                    id = "123",
                    title = "Some title",
                    description = "Some description",
                    extraContent = "Some extra content",
                    creationDate = LocalDate.now(),
                    picture = null,
                    authors = emptyList(),
                    supervisors = emptyList(),
                    documentation = emptyList(),
                    category = CategoryDTO(id = "1", name = "utn", tagName = "UTN", imageUrl = "https://image.com"),
                    organization = MedusaOrganizationDTO(
                        id = "123",
                        displayName = "Some org",
                        name = "someorg",
                        icon = MedusaFileDTO(
                            url = "https://icon.ico",
                            id = "123"
                        ),
                        supervisors = emptyList(),
                        authors = emptyList()
                    ),
                    tags = emptyList(),
                    recommendations = emptyList(),
                    project_keywords = emptyList()
                )

                val file = MedusaFileDTO(
                    id = "456",
                    url = "https://resource.com"
                )

                on(fileServiceMock.createMedusaFileFromUpload(
                    any(),
                    any(),
                    any(),
                    any()
                )).thenReturn(file)
                on(medusaClient.updateProjectImage(
                    projectId = eq("123"),
                    picture = eq(
                        UpdatePictureDTO(
                            picture = file
                        )
                    )
                )).thenReturn(project)

                projectService.updateProjectImage("123", multipartMock)
            }

            "default file name to the id of the project if the upload has no original name" {
                val multipartMock: MultipartFile = getMock()
                on(multipartMock.originalFilename).thenReturn(null)
                val project = MedusaProjectDTO(
                    id = "123",
                    title = "Some title",
                    description = "Some description",
                    extraContent = "Some extra content",
                    creationDate = LocalDate.now(),
                    picture = null,
                    authors = emptyList(),
                    supervisors = emptyList(),
                    documentation = emptyList(),
                    category = CategoryDTO(id = "1", name = "utn", tagName = "UTN", imageUrl = "https://image.com"),
                    organization = MedusaOrganizationDTO(
                        id = "123",
                        displayName = "Some org",
                        name = "someorg",
                        icon = MedusaFileDTO(
                            url = "https://icon.ico",
                            id = "123"
                        ),
                        supervisors = emptyList(),
                        authors = emptyList()
                    ),
                    tags = emptyList(),
                    recommendations = emptyList(),
                    project_keywords = emptyList()
                )

                val file = MedusaFileDTO(
                    id = "456",
                    url = "https://resource.com"
                )

                on(fileServiceMock.createMedusaFileFromUpload(
                    any(),
                    any(),
                    any(),
                    any()
                )).thenReturn(file)
                on(medusaClient.updateProjectImage(
                    projectId = eq("123"),
                    picture = eq(UpdatePictureDTO(picture = file))
                )).thenReturn(project)

                projectService.updateProjectImage("123", multipartMock)

                verify(medusaClient).updateProjectImage(
                    projectId = eq("123"),
                    picture = eq(UpdatePictureDTO(picture = file))
                )
            }
        }
    }
}
