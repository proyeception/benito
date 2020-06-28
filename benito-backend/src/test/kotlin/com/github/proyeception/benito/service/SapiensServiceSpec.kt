package com.github.proyeception.benito.service

import arrow.fx.IO
import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.connector.Response
import com.github.proyeception.benito.dto.AuthenticationResponseDTO
import com.github.proyeception.benito.dto.SapiensDTO
import com.github.proyeception.benito.dto.UserLoginDTO
import com.github.proyeception.benito.dto.UserTypeDTO
import com.github.proyeception.benito.exception.AuthenticationFailedException
import com.github.proyeception.benito.mock.eq
import com.github.proyeception.benito.mock.getMock
import com.github.proyeception.benito.mock.on
import io.kotlintest.matchers.shouldBe
import io.kotlintest.matchers.shouldThrow
import io.kotlintest.specs.WordSpec
import org.mockito.ArgumentMatchers.any

class SapiensServiceSpec : WordSpec() {
    init {
        val sapiensConnectorMock: Connector = getMock()
        val sapiensService = SapiensService(
            sapiensConnector = sapiensConnectorMock
        )

        "authenticate" should {
            val responseMock: Response = getMock()
            val user = UserLoginDTO(
                username = "benitocapo123",
                password = "123456789",
                userType = UserTypeDTO.STUDENT
            )

            "post withe the user object to /sapiens/authenticate" {
                val authenticationResponseDTO = AuthenticationResponseDTO(
                    session = "123",
                    userData = SapiensDTO(
                        name = "Benito",
                        lastName = "Quinquela",
                        socials = emptyList(),
                        projectRefs = emptyList(),
                        profilePicUrl = "/some-nice-url",
                        organization = "Some cool organization",
                        email = "benito@proyeception.com"
                    )
                )

                on(sapiensConnectorMock.post(eq("/sapiens/authenticate"), eq(user))).thenReturn(IO.just(responseMock))
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.deserializeAs(any(TypeReference::class.java))).thenReturn(authenticationResponseDTO)

                val expected = authenticationResponseDTO
                val actual = sapiensService.authenticate(user).unsafeRunSync()

                expected shouldBe actual
            }

            "throw if sapiens returns error" {
                on(sapiensConnectorMock.post("/sapiens/authenticate", user)).thenReturn(IO.just(responseMock))
                on(responseMock.isError()).thenReturn(true)

                shouldThrow<AuthenticationFailedException> {
                    sapiensService.authenticate(user).unsafeRunSync()
                }
            }
        }
    }
}