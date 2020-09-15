package com.github.proyeception.benito.service

import com.github.proyeception.benito.Spec
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.exception.UnauthorizedException
import com.github.proyeception.benito.mock.eq
import com.github.proyeception.benito.mock.getMock
import com.github.proyeception.benito.mock.on
import com.github.proyeception.benito.utils.HashHelper
import com.nhaarman.mockito_kotlin.verify
import io.kotlintest.matchers.shouldBe
import io.kotlintest.matchers.shouldThrow

class AuthenticationServiceTest : Spec() {
    init {
        val userServiceMock: UserService = getMock()
        val sessionServiceMock: SessionService = getMock()
        val hashMock: HashHelper = getMock()
        val authenticationService = AuthenticationService(
            userService = userServiceMock,
            sessionService = sessionServiceMock,
            hash = hashMock
        )

        "authenticateOrCreateAuthor" should {
            "should create the user if it does not exist" {
                on(hashMock.sha256(eq("456"))).thenReturn("hash456")
                on(userServiceMock.findAuthorByGoogleId(eq("123"))).thenReturn(null)
                on(userServiceMock.createAuthor(
                    "benito-quinquela",
                    "Benito Quinquela",
                    "benito@quinquela.com",
                    "123",
                    "456",
                    null
                )).thenReturn(
                    PersonDTO(
                        id = "789",
                        username = "benito-quinquela",
                        fullName = "Benito Quinquela",
                        organizations = emptyList(),
                        profilePicUrl = null,
                        projects = emptyList(),
                        socials = emptyList(),
                        contact = null
                    )
                )

                val expected = "hash456"
                val actual = authenticationService.authenticateOrCreateAuthor(
                    login = LoginDTO(
                        googleUserId = "123",
                        token = "456",
                        fullName = "Benito Quinquela",
                        mail = "benito@quinquela.com",
                        profilePicUrl = null
                    )
                )

                actual shouldBe expected

                verify(sessionServiceMock).set(
                    token = eq("hash456"),
                    info = eq(
                        SessionInfoDTO(
                            role = RoleDTO.AUTHOR,
                            userId = "789",
                            profilePicUrl = null
                        )
                    )
                )
            }

            "return the existent user if not null" {
                on(hashMock.sha256(eq("456"))).thenReturn("hash456")
                on(userServiceMock.findAuthorByGoogleId(eq("123"))).thenReturn(
                    PersonDTO(
                        id = "789",
                        username = null,
                        fullName = "Benito Quinquela",
                        organizations = emptyList(),
                        profilePicUrl = null,
                        contact = null,
                        socials = emptyList(),
                        projects = emptyList()
                    )
                )

                val expected = "hash456"
                val actual = authenticationService.authenticateOrCreateAuthor(
                    login = LoginDTO(
                        googleUserId = "123",
                        token = "456",
                        fullName = "Benito Quiqnuela",
                        mail = "benito@quinquela.com",
                        profilePicUrl = null
                    )
                )

                actual shouldBe expected

                verify(sessionServiceMock).set(
                    token = eq("hash456"),
                    info = eq(
                        SessionInfoDTO(
                            role = RoleDTO.AUTHOR,
                            userId = "789",
                            profilePicUrl = null
                        )
                    )
                )
            }
        }

        "authenticateSupervisor" should {
            "find the user in Medusa by its email" {
                on(userServiceMock.findSupervisorByEmail(eq("benito@quinquela.com"))).thenReturn(
                    PersonDTO(
                        id = "123",
                        username = null,
                        fullName = "Benito Quinquela",
                        organizations = emptyList(),
                        projects = emptyList(),
                        socials = emptyList(),
                        profilePicUrl = null,
                        contact = null
                    )
                )
                on(hashMock.sha256(eq("456"))).thenReturn("123")

                val expected = "123"
                val actual = authenticationService.authenticateSupervisor(
                    login = LoginDTO(
                        googleUserId = "123",
                        token = "456",
                        fullName = "Benito Quinquela",
                        mail = "benito@quinquela.com",
                        profilePicUrl = null
                    )
                )

                actual shouldBe expected

                verify(sessionServiceMock).set(
                    token = eq("123"),
                    info = eq(SessionInfoDTO(
                        userId = "123",
                        role = RoleDTO.SUPERVISOR,
                        profilePicUrl = null
                    ))
                )
            }

            "throw an UnauthorizedException if no result is found" {
                on(userServiceMock.findSupervisorByEmail(eq("benito@quinquela.com"))).thenReturn(null)
                shouldThrow<UnauthorizedException> {
                    authenticationService.authenticateSupervisor(
                        login = LoginDTO(
                            googleUserId = "123",
                            token = "456",
                            fullName = "Benito Quinquela",
                            mail = "benito@quinquela.com",
                            profilePicUrl = null
                        )
                    )
                }
            }
        }
    }
}