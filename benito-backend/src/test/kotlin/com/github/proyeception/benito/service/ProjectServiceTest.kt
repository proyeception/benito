package com.github.proyeception.benito.service


import com.github.proyeception.benito.Spec
import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.mock.getMock
import com.github.proyeception.benito.mock.on
import io.kotlintest.matchers.shouldBe
import org.mockito.Mockito
import java.time.LocalDate

class ProjectServiceTest : Spec() {
    init {
        "projects" should {
            "return list of projects" {
                val medusaClient: MedusaClient = getMock()
                val projectService = ProjectService(
                    medusaClient = medusaClient
                )

                val author = AuthorDTO(
                    id = "123",
                    fullName = "Benito Quinquela",
                    username = "author",
                    profileUrl = "/authorUrl"
                )

                val supervisor = SupervisorDTO(
                    id = "123",
                    fullName = "Jorge Luis Borges",
                    username = "supervisor",
                    profileUrl = "/supervisorUrl"
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
                    authors = listOf(PersonDTO(username = "author", fullName = "Benito Quinquela", profileUrl = "/authorUrl")),
                    supervisors = listOf(PersonDTO(username = "supervisor", fullName = "Jorge Luis Borges", profileUrl = "/supervisorUrl")),
                    tags = emptyList(),
                    documentation = listOf(documentation)
                )

                val newProject = MedusaProjectDTO(
                    id = "1",
                    title = "project title",
                    description = "project description",
                    extraContent = "nicely formatted content",
                    creationDate = LocalDate.of(2020, 2, 6),
                    poster = PosterDTO(url = ""),
                    authorRefs = listOf(author),
                    supervisorRefs = listOf(supervisor),
                    documentation = listOf(documentation),
                    category = CategoryDTO(
                        name = "Systems",
                        tagName = "systems",
                        imageUrl = ""
                    )
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
                val projectService = ProjectService(
                    medusaClient = medusaClient
                )

                val author = AuthorDTO(
                    id = "123",
                    fullName = "Benito Quinquela",
                    username = "author",
                    profileUrl = "/authorUrl"
                )

                val supervisor = SupervisorDTO(
                    id = "123",
                    fullName = "Jorge Luis Borges",
                    username = "supervisor",
                    profileUrl = "/supervisorUrl"
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
                    authors = listOf(PersonDTO(username = "author", fullName = "Benito Quinquela", profileUrl = "/authorUrl")),
                    supervisors = listOf(PersonDTO(username = "supervisor", fullName = "Jorge Luis Borges", profileUrl = "/supervisorUrl")),
                    tags = emptyList(),
                    documentation = listOf(documentation)
                )

                val newProject = MedusaProjectDTO(
                    id = "1",
                    title = "project title",
                    description = "project description",
                    extraContent = "nicely formatted content",
                    creationDate = LocalDate.of(2020, 2, 6),
                    poster = PosterDTO(url = ""),
                    authorRefs = listOf(author),
                    supervisorRefs = listOf(supervisor),
                    documentation = listOf(documentation),
                    category = CategoryDTO("Systems", "systems", "")
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
