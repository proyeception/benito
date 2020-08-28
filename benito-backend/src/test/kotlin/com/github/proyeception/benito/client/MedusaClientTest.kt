package com.github.proyeception.benito.client

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.Spec
import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.connector.Response
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.exception.FailedDependencyException
import com.github.proyeception.benito.mock.eq
import com.github.proyeception.benito.mock.getMock
import com.github.proyeception.benito.mock.on
import io.kotlintest.matchers.shouldBe
import io.kotlintest.matchers.shouldThrow
import org.mockito.ArgumentMatchers
import org.mockito.ArgumentMatchers.any
import org.mockito.ArgumentMatchers.anyString
import org.mockito.Mockito.verify
import java.time.LocalDate

class MedusaClientTest : Spec() {
    init {
        val medusaConnector: Connector = getMock()
        val medusaClient = MedusaClient(medusaConnector)

        "findProjects" should {
            val responseMock: Response = getMock()
            val author = PersonRefDTO(
                id = "123",
                username = "author",
                fullName = "UnNombre"
            )

            val supervisor = PersonRefDTO(
                id = "123",
                username = "supervisor",
                fullName = "UnNombre"
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
                authors = listOf(author),
                supervisors = listOf(supervisor),
                tags = listOf("tag1", "tag2"),
                documentation = listOf(documentation)
            )

            "get to /projects returns all projects" {
                val projectsResponse = listOf<ProjectDTO>(project)

                on(medusaConnector.get(eq(PROJECTS_PATH))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.deserializeAs(ArgumentMatchers.any(TypeReference::class.java))).thenReturn(projectsResponse)

                val expected = projectsResponse
                val actual = medusaClient.getProjects()

                expected shouldBe actual
            }

            "throw if medusa returns error" {
                on(medusaConnector.get(eq(PROJECTS_PATH))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(true)

                shouldThrow<FailedDependencyException> {
                    medusaClient.getProjects()
                }
            }

            "should get to strapi's ascending date sort by creationDate when using DATE_ASC" {
                val projectsResponse = listOf<ProjectDTO>(project)

                val expectedEndpoint =
                    PROJECTS_PATH + QUERY_PARAM_START + STRAPI_SORT_QUERY_PARAM + STRAPI_DATE_FIELD + STRAPI_ASC_IDENTIFIER
                on(medusaConnector.get(eq(expectedEndpoint))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.deserializeAs(ArgumentMatchers.any(TypeReference::class.java))).thenReturn(projectsResponse)

                val expected = projectsResponse
                val actual = medusaClient.getProjects(OrderDTO.DATE_ASC)

                expected shouldBe actual
            }

            "should get to strapi's descending date sort by creationDate when using DATE_DESC" {
                val projectsResponse = listOf<ProjectDTO>(project)

                val expectedEndpoint =
                    PROJECTS_PATH + QUERY_PARAM_START + STRAPI_SORT_QUERY_PARAM + STRAPI_DATE_FIELD + STRAPI_DESC_IDENTIFIER
                on(medusaConnector.get(eq(expectedEndpoint))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.deserializeAs(ArgumentMatchers.any(TypeReference::class.java))).thenReturn(projectsResponse)

                val expected = projectsResponse
                val actual = medusaClient.getProjects(OrderDTO.DATE_DESC)

                expected shouldBe actual
            }

            "should get to strapi's ascending alphabetic sort by title when using ALPHA_ASC" {
                val projectsResponse = listOf<ProjectDTO>(project)

                val expectedEndpoint =
                    PROJECTS_PATH + QUERY_PARAM_START + STRAPI_SORT_QUERY_PARAM + STRAPI_TITLE_FIELD + STRAPI_ASC_IDENTIFIER
                on(medusaConnector.get(eq(expectedEndpoint))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.deserializeAs(ArgumentMatchers.any(TypeReference::class.java))).thenReturn(projectsResponse)

                val expected = projectsResponse
                val actual = medusaClient.getProjects(OrderDTO.ALPHA_ASC)

                expected shouldBe actual
            }

            "should get to strapi's descending alphabetic sort by title when using ALPHA_DESC" {
                val projectsResponse = listOf<ProjectDTO>(project)

                val expectedEndpoint =
                    PROJECTS_PATH + QUERY_PARAM_START + STRAPI_SORT_QUERY_PARAM + STRAPI_TITLE_FIELD + STRAPI_DESC_IDENTIFIER
                on(medusaConnector.get(eq(expectedEndpoint))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.deserializeAs(ArgumentMatchers.any(TypeReference::class.java))).thenReturn(projectsResponse)

                val expected = projectsResponse
                val actual = medusaClient.getProjects(OrderDTO.ALPHA_DESC)

                expected shouldBe actual
            }

            "should get to strapi's filter by creationDate with greater than equal when receiving from date" {
                val projectsResponse = listOf<ProjectDTO>(project)

                val fromDate = "2020-06-06"

                val expectedEndpoint =
                    PROJECTS_PATH + QUERY_PARAM_START + STRAPI_DATE_FIELD + STRAPI_GTE_OPERATOR + fromDate
                on(medusaConnector.get(eq(expectedEndpoint))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.deserializeAs(ArgumentMatchers.any(TypeReference::class.java))).thenReturn(projectsResponse)

                val expected = projectsResponse
                val actual = medusaClient.getProjects(from = fromDate)

                expected shouldBe actual
            }

            "should get to strapi's filter by creationDate with less than equal when receiving to date" {
                val projectsResponse = listOf<ProjectDTO>(project)

                val toDate = "2020-06-06"

                val expectedEndpoint =
                    PROJECTS_PATH + QUERY_PARAM_START + STRAPI_DATE_FIELD + STRAPI_LTE_OPERATOR + toDate
                on(medusaConnector.get(eq(expectedEndpoint))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.deserializeAs(ArgumentMatchers.any(TypeReference::class.java))).thenReturn(projectsResponse)

                val expected = projectsResponse
                val actual = medusaClient.getProjects(to = toDate)

                expected shouldBe actual
            }

            "should get to strapi's filter by title with contains when receiving a nameContains" {
                val projectsResponse = listOf<ProjectDTO>(project)

                val projectName = "name"

                val expectedEndpoint =
                    PROJECTS_PATH + QUERY_PARAM_START + STRAPI_TITLE_FIELD + STRAPI_CONTAINS_OPERATOR + projectName
                on(medusaConnector.get(eq(expectedEndpoint))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.deserializeAs(ArgumentMatchers.any(TypeReference::class.java))).thenReturn(projectsResponse)

                val expected = projectsResponse
                val actual = medusaClient.getProjects(nameContains = projectName)

                expected shouldBe actual
            }

            "should concat multiple filter and sort" {
                val projectsResponse = listOf<ProjectDTO>(project)

                val projectName = "name"

                val expectedEndpoint =
                    PROJECTS_PATH + QUERY_PARAM_START + STRAPI_SORT_QUERY_PARAM + STRAPI_DATE_FIELD + STRAPI_ASC_IDENTIFIER + QUERY_PARAM_SEPARATOR + STRAPI_TITLE_FIELD + STRAPI_CONTAINS_OPERATOR + projectName
                on(medusaConnector.get(eq(expectedEndpoint))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.deserializeAs(ArgumentMatchers.any(TypeReference::class.java))).thenReturn(projectsResponse)

                val expected = projectsResponse
                val actual = medusaClient.getProjects(orderBy = OrderDTO.DATE_ASC, nameContains = projectName)

                expected shouldBe actual
            }
        }

        "projectCount" should {
            val responseMock: Response = getMock()

            "make a GET to /projects/count" {
                on(medusaConnector.get(anyString())).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.body).thenReturn("123")

                val expected = 123
                val actual = medusaClient.projectCount()

                expected shouldBe actual
                verify(medusaConnector).get(eq("/projects/count"))
            }

            "throw a failed dependency if medusa responds with a null body" {
                on(medusaConnector.get(anyString())).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.body).thenReturn(null)

                shouldThrow<FailedDependencyException> { medusaClient.projectCount() }
                verify(medusaConnector).get(eq("/projects/count"))
            }

            "throw a failed dependency if medusa responds with an error" {
                on(medusaConnector.get(anyString())).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(true)

                shouldThrow<FailedDependencyException> { medusaClient.projectCount() }
                verify(medusaConnector).get(eq("/projects/count"))
            }
        }

        "top10Projects" should {
            val responseMock: Response = getMock()

            "make a GET to /projects with limit 10" {
                on(medusaConnector.get(anyString())).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.deserializeAs(any(TypeReference::class.java))).thenReturn(null)
                medusaClient.top10Projects()
                verify(medusaConnector).get(eq("/projects?_limit=10"))
            }
        }

        "findProject" should {
            val responseMock: Response = getMock()
            val author = PersonRefDTO(
                id = "123",
                username = "author",
                fullName = "UnNombre"
            )

            val supervisor = PersonRefDTO(
                id = "1234",
                username = "supervisor",
                fullName = "UnNombre"
            )

            val documentation = DocumentationDTO(
                id = "asd",
                fileName = "Acta de proyecto",
                driveId = "123"
            )

            val project = MedusaProjectDTO(
                id = "1",
                title = "project title",
                description = "project description",
                extraContent = "nice formatted content",
                creationDate = LocalDate.of(2020, 2, 6),
                poster = ImageDTO("poster", "poster"),
                authors = listOf(author),
                supervisors = listOf(supervisor),
                category = CategoryDTO(name = "Systems", tagName = "systems", imageUrl = ""),
                documentation = listOf(documentation),
                organization = MedusaOrganizationDTO(
                    displayName = "UTN FRBA",
                    name = "utnfrba",
                    icon = ImageDTO("icon", "icon")
                ),
                tags = emptyList()
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

    companion object {
        const val PROJECTS_PATH = "/projects"
        const val QUERY_PARAM_START = "?"
        const val QUERY_PARAM_SEPARATOR = "&"

        const val STRAPI_SORT_QUERY_PARAM = "_sort="
        const val STRAPI_ASC_IDENTIFIER = ":ASC"
        const val STRAPI_DESC_IDENTIFIER = ":DESC"

        const val STRAPI_GTE_OPERATOR = "_gte="
        const val STRAPI_LTE_OPERATOR = "_lte="
        const val STRAPI_CONTAINS_OPERATOR = "_contains="

        const val STRAPI_DATE_FIELD = "creation_date"
        const val STRAPI_TITLE_FIELD = "title"
    }
}
