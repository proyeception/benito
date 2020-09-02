package com.github.proyeception.benito.service

import com.github.proyeception.benito.Spec
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.mock.eq
import com.github.proyeception.benito.mock.getMock
import com.github.proyeception.benito.mock.on
import com.nhaarman.mockito_kotlin.verify
import io.kotlintest.matchers.shouldBe

class AuthenticationServiceTest : Spec() {
    init {
        val userServiceMock: UserService = getMock()
        val sessionServiceMock: SessionService = getMock()
        val authorizationService = AuthenticationService(
            userService = userServiceMock,
            sessionService = sessionServiceMock
        )

        "authenticate" should {
            "should create the user if it does not exist" {
                on(userServiceMock.findAuthorByGoogleId(eq("123"))).thenReturn(null)
                on(userServiceMock.createAuthor(
                    null,
                    "Benito Quinquela",
                    "benito@quinquela.com",
                    "123",
                    "456",
                    null
                )).thenReturn(
                    MedusaPersonDTO(
                        id = "789",
                        username = null,
                        fullName = "Benito Quinquela",
                        organizations = emptyList(),
                        profilePic = null,
                        projects = emptyList(),
                        socials = emptyList(),
                        mail = "benito@quinquela.com",
                        phone = null
                    )
                )

                val expected = "456"
                val actual = authorizationService.authenticate(
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
                    token = eq("456"),
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

                val expected = "456"
                val actual = authorizationService.authenticate(
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
                    token = eq("456"),
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
    }
}