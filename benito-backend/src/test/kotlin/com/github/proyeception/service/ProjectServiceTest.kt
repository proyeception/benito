package com.github.proyeception.benito.service


import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.connector.Response
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.exception.UnauthorizedException
import com.github.proyeception.mock.eq
import com.github.proyeception.mock.getMock
import com.github.proyeception.mock.on
import io.kotlintest.matchers.shouldBe
import io.kotlintest.matchers.shouldThrow
import io.kotlintest.specs.WordSpec
import org.mockito.ArgumentMatchers.any
import java.time.LocalDate

class CataServiceSpec : WordSpec() {
    init {
        val mangoConnectorMock: Connector = getMock()
        val projectService = ProjectService(
                mangoConnector = mangoConnectorMock
        )

        "findProjects" should {
            val responseMock: Response = getMock()
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

            "get to /projects returns all projects" {
                val projectsResponse = listOf<ProjectDTO>(project)

                on(mangoConnectorMock.get(eq("/projects"))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.deserializeAs(any(TypeReference::class.java))).thenReturn(projectsResponse)

                val expected = projectsResponse
                val actual = projectService.findProjects()

                expected shouldBe actual
            }

            "throw if cata returns error" {
                on(mangoConnectorMock.get(eq("/projects"))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(true)

                shouldThrow<UnauthorizedException> {
                    projectService.findProjects()
                }
            }
        }
    }
}