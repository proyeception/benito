package com.github.proyeception.benito.service


import com.github.proyeception.benito.client.MangoClient
import com.github.proyeception.benito.dto.PersonDTO
import com.github.proyeception.benito.dto.ProjectDTO
import com.github.proyeception.mock.getMock
import com.github.proyeception.mock.on
import io.kotlintest.matchers.shouldBe
import io.kotlintest.specs.WordSpec
import org.mockito.Mockito
import java.time.LocalDate

class ProjectServiceTest : WordSpec() {
    init {
        "should return list of projects" {
            val mangoClient: MangoClient = getMock()
            val projectService = ProjectService(
                    mangoClient = mangoClient
            )

            val author = PersonDTO(
                    user = "author",
                    profileUrl = "/authorUrl"
            )

            val supervisor = PersonDTO(
                    user = "supervisor",
                    profileUrl = "/supervisorUrl"
            )

            val project = ProjectDTO(
                    id = "1",
                    title = "project title",
                    subtitle = "project subtitle",
                    description = "project description",
                    creationDate = LocalDate.parse("2020-02-06"),
                    posterUrl = "",
                    authors = listOf(author),
                    supervisors = listOf(supervisor),
                    tags = listOf("tag1", "tag2")
            )

            val newProject = ProjectDTO(
                    id = "1",
                    title = "project title",
                    subtitle = "project subtitle",
                    description = "project description",
                    creationDate = LocalDate.parse("2020-02-06"),
                    posterUrl = "",
                    authors = listOf(author),
                    supervisors = listOf(supervisor),
                    tags = listOf("tag1", "tag2")
            )

            val projects = listOf<ProjectDTO>(newProject)
            val expected = listOf<ProjectDTO>(project)

            on(mangoClient.getProjects()).thenReturn(projects)

            val actual = projectService.findProjects()

            expected shouldBe actual

            Mockito.verify(mangoClient).getProjects()
        }
    }
}