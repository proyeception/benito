package com.github.proyeception.client

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.client.MangoClient
import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.connector.Response
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
import org.mockito.Mockito.verify

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
            verify(mangoConnector).get(eq("/mango/users?username=benito&password=benitocapo123&usertype=STUDENT"))
        }

        "should always throw a NotFoundException if the server responds with any error" {
            val responseMock: Response = getMock()

            on(mangoConnector.get(anyString())).thenReturn(responseMock)
            on(responseMock.isError()).thenReturn(true)
            on(responseMock.body).thenReturn("Foo")

            shouldThrow<NotFoundException> {
                mangoClient.findUser(username = "benito", password = "benitocapo123", userType = "STUDENT")
            }

            verify(responseMock).isError()
            verify(mangoConnector).get(eq("/mango/users?username=benito&password=benitocapo123&usertype=STUDENT"))
        }
    }
}