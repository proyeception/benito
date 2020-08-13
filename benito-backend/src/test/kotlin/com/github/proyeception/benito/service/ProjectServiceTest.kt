package com.github.proyeception.benito.service


import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.mock.getMock
import com.github.proyeception.benito.mock.on
import io.kotlintest.matchers.shouldBe
import io.kotlintest.specs.WordSpec
import org.mockito.Mockito
import java.time.LocalDate

class ProjectServiceTest : WordSpec() {
    init {
        val medusaClient: MedusaClient = getMock()
        val projectService = ProjectService(
            medusaClient = medusaClient
        )

        "findProject" should {
            "should return list of projects" {

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

                val project = ProjectDTO(
                    id = "1",
                    title = "project title",
                    extraContent = "extra content",
                    description = "project description",
                    creationDate = LocalDate.of(2020, 2, 6),
                    posterUrl = "",
                    authors = listOf(
                        PersonDTO(
                            username = "author",
                            profileUrl = "/authorUrl",
                            fullName = "Benito Quinquela"
                        )
                    ),
                    supervisors = listOf(
                        PersonDTO(
                            username = "supervisor",
                            profileUrl = "/supervisorUrl",
                            fullName = "Jorge Luis Borges"
                        )
                    ),
                    tags = emptyList()
                )

                val newProject = MedusaProjectDTO(
                    id = "1",
                    title = "project title",
                    description = "project description",
                    extraContent = "extra content",
                    creationDate = LocalDate.of(2020, 2, 6),
                    poster = PosterDTO(url = ""),
                    authorRefs = listOf(author),
                    supervisorRefs = listOf(supervisor),
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

        "count" should {
            "wrap the response from Medusa in a ProjectCountDTO" {
                on(medusaClient.projectCount()).thenReturn(100)

                val expected = CountDTO(100)
                val actual = projectService.count()

                expected shouldBe actual
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

                val project = ProjectDTO(
                    id = "1",
                    title = "project title",
                    description = "project description",
                    extraContent = "nicely formatted content",
                    creationDate = LocalDate.of(2020, 2, 6),
                    posterUrl = "",
                    authors = listOf(PersonDTO(username = "author", fullName = "Benito Quinquela", profileUrl = "/authorUrl")),
                    supervisors = listOf(PersonDTO(username = "supervisor", fullName = "Jorge Luis Borges", profileUrl = "/supervisorUrl")),
                    tags = emptyList()
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
