package com.github.proyeception.benito.service


import com.github.proyeception.benito.Spec
import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.mock.getMock
import com.github.proyeception.benito.mock.on
import com.github.proyeception.benito.parser.DocumentParser
import io.kotlintest.matchers.shouldBe
import org.mockito.Mockito
import java.time.LocalDate

class ProjectServiceTest : Spec() {
    init {
        "projects" should {
            "return list of projects" {
                val medusaClient: MedusaClient = getMock()
                val documentParserMock: DocumentParser = getMock()
                val documentService: DocumentService = getMock()
                val projectService = ProjectService(
                    medusaClient = medusaClient,
                    documentParser = documentParserMock,
                    documentService = documentService
                )

                val author = PersonRefDTO(
                    id = "123",
                    fullName = "Benito Quinquela",
                    username = "author"
                )

                val supervisor = PersonRefDTO(
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
                    posterUrl = "",
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
                    documentation = listOf(documentation)
                )

                val newProject = MedusaProjectDTO(
                    id = "1",
                    title = "project title",
                    description = "project description",
                    extraContent = "nicely formatted content",
                    creationDate = LocalDate.of(2020, 2, 6),
                    poster = ImageDTO(url = "", name = ""),
                    authors = listOf(author),
                    supervisors = listOf(supervisor),
                    documentation = listOf(documentation),
                    category = CategoryDTO(
                        name = "Systems",
                        tagName = "systems",
                        imageUrl = ""
                    ),
                    organization = OrganizationDTO(
                        displayName = "UTN FRBA",
                        name = "utnfrba"
                    ),
                    tags = emptyList()
                )

                val projects = listOf(newProject)
                val expected = listOf(project)

                on(medusaClient.getProjects()).thenReturn(projects)

                val actual = projectService.findProjects(null, null, null, null, null)

                expected shouldBe actual

                Mockito.verify(medusaClient).getProjects()
            }
        }

        "project" should {
            "should return a specific project" {
                val medusaClient: MedusaClient = getMock()
                val documentParserMock: DocumentParser = getMock()
                val documentService: DocumentService = getMock()
                val projectService = ProjectService(
                    medusaClient = medusaClient,
                    documentParser = documentParserMock,
                    documentService = documentService
                )

                val author = PersonRefDTO(
                    id = "123",
                    fullName = "Benito Quinquela",
                    username = "author"
                )

                val supervisor = PersonRefDTO(
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
                    posterUrl = "",
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
                    documentation = listOf(documentation)
                )

                val newProject = MedusaProjectDTO(
                    id = "1",
                    title = "project title",
                    description = "project description",
                    extraContent = "nicely formatted content",
                    creationDate = LocalDate.of(2020, 2, 6),
                    poster = ImageDTO(url = "", name = ""),
                    authors = listOf(author),
                    supervisors = listOf(supervisor),
                    documentation = listOf(documentation),
                    category = CategoryDTO("Systems", "systems", ""),
                    organization = OrganizationDTO(
                        displayName = "UTN FRBA",
                        name = "utnfrba"
                    ),
                    tags = emptyList()
                )

                val projectResult = newProject
                val expected = project

                on(medusaClient.project("1")).thenReturn(projectResult)

                val actual = projectService.findProject("1")

                expected shouldBe actual

                Mockito.verify(medusaClient).project("1")
            }
        }

    }
}
