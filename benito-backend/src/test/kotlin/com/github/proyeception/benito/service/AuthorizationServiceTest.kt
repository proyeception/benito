package com.github.proyeception.benito.service

import com.github.proyeception.benito.Spec
import com.github.proyeception.benito.mock.getMock
import com.github.proyeception.benito.mock.on
import com.github.proyeception.benito.oauth.GoogleAccountClient
import io.kotlintest.matchers.shouldBe

class AuthorizationServiceTest : Spec() {
    init {
        val userServiceMock: UserService = getMock()
        val googleClientMock: GoogleAccountClient = getMock()
        val sessionServiceMock: SessionService = getMock()
        val authorizationService = AuthorizationService(
            googleAccountClient = googleClientMock,
            userService = userServiceMock,
            sessionService = sessionServiceMock
        )

        "initAuth" should {
            "ask the google account client to init auth and return the redirect url" {
                on(googleClientMock.initNewAuth()).thenReturn(Pair("a", "https://google.com"))

                val expected = "https://google.com"
                val actual = authorizationService.initAuth()

                actual shouldBe expected
            }
        }

        "finishAuth" should {

        }
    }
}