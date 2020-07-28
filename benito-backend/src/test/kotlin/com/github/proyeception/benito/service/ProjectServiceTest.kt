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
        "should return list of projects" {
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
                subtitle = "project subtitle",
                description = "project description",
                summary = "project summary",
                creationDate = LocalDate.of(2020, 2, 6),
                posterUrl = "",
                authors = listOf(PersonDTO(username = "author", profileUrl = "/authorUrl")),
                supervisors = listOf(PersonDTO(username = "supervisor", profileUrl = "/supervisorUrl")),
                tags = emptyList()
            )

            val newProject = MedusaProjectDTO(
                id = "1",
                title = "project title",
                subtitle = "project subtitle",
                description = "project description",
                summary = "project summary",
                creationDate = LocalDate.of(2020, 2, 6),
                poster = PosterDTO(url = ""),
                authorRefs = listOf(author),
                supervisorRefs = listOf(supervisor)
            )

            val projects = listOf(newProject)
            val expected = listOf(project)

            on(medusaClient.projects()).thenReturn(projects)

            val actual = projectService.findProjects(null)

            expected shouldBe actual

            Mockito.verify(medusaClient).projects()
        }
    }
}