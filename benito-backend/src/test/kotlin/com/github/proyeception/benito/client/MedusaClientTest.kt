package com.github.proyeception.benito.client

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.connector.Response
import com.github.proyeception.benito.dto.OrderDTO
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

                on(medusaConnector.get(eq(STRAPI_PROJECTS_PATH))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.deserializeAs(ArgumentMatchers.any(TypeReference::class.java))).thenReturn(projectsResponse)

                val expected = projectsResponse
                val actual = medusaClient.getProjects()

                expected shouldBe actual
            }

            "throw if medusa returns error" {
                on(medusaConnector.get(eq(STRAPI_PROJECTS_PATH))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(true)

                shouldThrow<FailedDependencyException> {
                    medusaClient.getProjects()
                }
            }

            "should get to strapi's ascending date sort when using DATE_ASC" {
                val projectsResponse = listOf<ProjectDTO>(project)

                val expectedEndpoint =
                        STRAPI_PROJECTS_PATH + QUERY_PARAM_START + STRAPI_SORT_QUERY_PARAM + STRAPI_DATE_FIELD + STRAPI_ASC_IDENTIFIER
                on(medusaConnector.get(eq(expectedEndpoint))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.deserializeAs(ArgumentMatchers.any(TypeReference::class.java))).thenReturn(projectsResponse)

                val expected = projectsResponse
                val actual = medusaClient.getProjects(OrderDTO.DATE_ASC)

                expected shouldBe actual
            }

            "should get to strapi's descending date sort when using DATE_DESC" {
                val projectsResponse = listOf<ProjectDTO>(project)

                val expectedEndpoint =
                        STRAPI_PROJECTS_PATH + QUERY_PARAM_START + STRAPI_SORT_QUERY_PARAM + STRAPI_DATE_FIELD + STRAPI_DESC_IDENTIFIER
                on(medusaConnector.get(eq(expectedEndpoint))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.deserializeAs(ArgumentMatchers.any(TypeReference::class.java))).thenReturn(projectsResponse)

                val expected = projectsResponse
                val actual = medusaClient.getProjects(OrderDTO.DATE_DESC)

                expected shouldBe actual
            }

            "should get to strapi's ascending alphabetic sort when using ALPHA_ASC" {
                val projectsResponse = listOf<ProjectDTO>(project)

                val expectedEndpoint =
                        STRAPI_PROJECTS_PATH + QUERY_PARAM_START + STRAPI_SORT_QUERY_PARAM + STRAPI_ALPHABETIC_FIELD + STRAPI_ASC_IDENTIFIER
                on(medusaConnector.get(eq(expectedEndpoint))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.deserializeAs(ArgumentMatchers.any(TypeReference::class.java))).thenReturn(projectsResponse)

                val expected = projectsResponse
                val actual = medusaClient.getProjects(OrderDTO.ALPHA_ASC)

                expected shouldBe actual
            }

            "should get to strapi's descending alphabetic sort when using ALPHA_DESC" {
                val projectsResponse = listOf<ProjectDTO>(project)

                val expectedEndpoint =
                        STRAPI_PROJECTS_PATH + QUERY_PARAM_START + STRAPI_SORT_QUERY_PARAM + STRAPI_ALPHABETIC_FIELD + STRAPI_DESC_IDENTIFIER
                on(medusaConnector.get(eq(expectedEndpoint))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.deserializeAs(ArgumentMatchers.any(TypeReference::class.java))).thenReturn(projectsResponse)

                val expected = projectsResponse
                val actual = medusaClient.getProjects(OrderDTO.ALPHA_DESC)

                expected shouldBe actual
            }

        }
    }

    companion object {
        const val STRAPI_PROJECTS_PATH = "/projects"
        const val QUERY_PARAM_START = "?"

        const val STRAPI_SORT_QUERY_PARAM = "_sort="
        const val STRAPI_ASC_IDENTIFIER = ":ASC"
        const val STRAPI_DESC_IDENTIFIER = ":DESC"


        const val STRAPI_DATE_FIELD = "creationDate"
        const val STRAPI_ALPHABETIC_FIELD = "title"
    }
}