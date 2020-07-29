package com.github.proyeception.benito.client

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.connector.Response
import com.github.proyeception.benito.dto.PersonDTO
import com.github.proyeception.benito.dto.ProjectDTO
import com.github.proyeception.benito.exception.FailedDependencyException
import com.github.proyeception.benito.mock.eq
import com.github.proyeception.benito.mock.getMock
import com.github.proyeception.benito.mock.on
import io.kotlintest.matchers.shouldBe
import io.kotlintest.matchers.shouldThrow
import io.kotlintest.specs.WordSpec
import org.mockito.ArgumentMatchers
import java.time.LocalDate

class MedusaClientTest : WordSpec() {
    init {
        val medusaConnector: Connector = getMock()
        val medusaClient = MedusaClient(medusaConnector)

        "findProjects" should {
            val responseMock: Response = getMock()
            val author = PersonDTO(
                username = "author",
                profileUrl = "/authorUrl"
            )

            val supervisor = PersonDTO(
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
                authors = listOf(author),
                supervisors = listOf(supervisor),
                tags = listOf("tag1", "tag2")
            )

            "get to /projects returns all projects" {
                val projectsResponse = listOf<ProjectDTO>(project)

                on(medusaConnector.get(eq("/projects"))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.deserializeAs(ArgumentMatchers.any(TypeReference::class.java))).thenReturn(projectsResponse)

                val expected = projectsResponse
                val actual = medusaClient.projects()

                expected shouldBe actual
            }

            "throw if mango returns error" {
                on(medusaConnector.get(eq("/projects"))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(true)

                shouldThrow<FailedDependencyException> {
                    medusaClient.projects()
                }
            }
        }

        "findProject" should {
            val responseMock: Response = getMock()
            val author = PersonDTO(
                    username = "author",
                    profileUrl = "/authorUrl"
            )

            val supervisor = PersonDTO(
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
                    authors = listOf(author),
                    supervisors = listOf(supervisor),
                    tags = listOf("tag1", "tag2")
            )

            "get to /projects/{id} returns specified project" {
                val projectResponse = project

                on(medusaConnector.get(eq("/projects/1"))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.deserializeAs(ArgumentMatchers.any(TypeReference::class.java))).thenReturn(projectResponse)

                val expected = projectResponse
                val actual = medusaClient.project("1")

                expected shouldBe actual
            }

            "throw if mango returns error" {
                on(medusaConnector.get(eq("/projects/1"))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(true)

                shouldThrow<FailedDependencyException> {
                    medusaClient.project("1")
                }
            }
        }
    }
}