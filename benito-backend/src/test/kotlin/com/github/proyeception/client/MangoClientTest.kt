package com.github.proyeception.client

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.client.MangoClient
import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.connector.Response
import com.github.proyeception.benito.dto.PersonDTO
import com.github.proyeception.benito.dto.ProjectDTO
import com.github.proyeception.benito.dto.UserInfoDTO
import com.github.proyeception.benito.exception.NotFoundException
import com.github.proyeception.mock.eq
import com.github.proyeception.mock.getMock
import com.github.proyeception.mock.on
import io.kotlintest.matchers.shouldBe
import io.kotlintest.matchers.shouldThrow
import io.kotlintest.specs.WordSpec
import org.mockito.ArgumentMatchers.any
import org.mockito.ArgumentMatchers.anyString
import org.mockito.Mockito.never
import org.mockito.Mockito.verify
import java.time.LocalDate

open class MangoClientTest : WordSpec() {
    init {
        val mangoConnector: Connector = getMock()
        val mangoClient = MangoClient(mangoConnector)

        "should make a GET request to Mango and map the response to UserInfoDTO" {
            val responseMock: Response = getMock()

            on(mangoConnector.get(anyString())).thenReturn(responseMock)
            on(responseMock.isError()).thenReturn(false)
            on(responseMock.deserializeAs(any(TypeReference::class.java))).thenReturn(UserInfoDTO(
                    id = "123",
                    name = "Benito",
                    lastName = "Quinquela",
                    profilePicUrl = "https://github.com/favicon.ico",
                    email = "benito@project.com",
                    organization = "Proyectate",
                    projectRefs = emptyList(),
                    socials = emptyList()
            ))

            val expected = UserInfoDTO(
                    id = "123",
                    name = "Benito",
                    lastName = "Quinquela",
                    profilePicUrl = "https://github.com/favicon.ico",
                    email = "benito@project.com",
                    organization = "Proyectate",
                    projectRefs = emptyList(),
                    socials = emptyList()
            )

            val actual = mangoClient.findUser(username = "benito", password = "benitocapo123", userType = "STUDENT")

            expected shouldBe actual

            verify(responseMock).isError()
            verify(mangoConnector).get(eq("/mango/users?username=benito&password=benitocapo123&userType=STUDENT"))
            verify(responseMock).deserializeAs(any(TypeReference::class.java))

            "should always throw a NotFoundException if the server responds with any error" {
                val responseMock: Response = getMock()

                on(mangoConnector.get(anyString())).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(true)
                on(responseMock.body).thenReturn("Foo")

                shouldThrow<NotFoundException> {
                    mangoClient.findUser(username = "benito", password = "benitocapo123", userType = "STUDENT")
                }

                verify(responseMock).isError()
                verify(mangoConnector).get(eq("/mango/users?username=benito&password=benitocapo123&userType=STUDENT"))
                verify(responseMock, never()).deserializeAs(any(TypeReference::class.java))
            }
        }

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

                on(mangoConnector.get(eq("/projects"))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.deserializeAs(any(TypeReference::class.java))).thenReturn(projectsResponse)

                val expected = projectsResponse
                val actual = mangoClient.getProjects()

                expected shouldBe actual
            }

            "throw if mango returns error" {
                on(mangoConnector.get(eq("/projects"))).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(true)

                shouldThrow<NotFoundException> {
                    mangoClient.getProjects()
                }
            }
        }
    }
}