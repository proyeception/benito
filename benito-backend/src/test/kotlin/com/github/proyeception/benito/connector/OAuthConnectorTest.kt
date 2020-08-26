package com.github.proyeception.benito.connector

import arrow.core.getOrElse
import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.Spec
import com.github.proyeception.benito.exception.HttpException
import com.github.proyeception.benito.mock.eq
import com.github.proyeception.benito.mock.getMock
import com.github.proyeception.benito.mock.on
import com.github.proyeception.benito.mock.shouldBeEqual
import com.github.proyeception.benito.types.ScribeResponse
import com.github.scribejava.core.model.OAuth2AccessToken
import com.github.scribejava.core.model.OAuthRequest
import com.github.scribejava.core.model.Verb
import com.github.scribejava.core.oauth.OAuth20Service
import com.nhaarman.mockito_kotlin.atLeastOnce
import io.kotlintest.matchers.should
import io.kotlintest.matchers.shouldBe
import io.kotlintest.properties.Gen
import io.kotlintest.properties.forAll
import org.mockito.ArgumentCaptor
import org.mockito.ArgumentMatchers
import org.mockito.Mockito.any
import org.mockito.Mockito.verify

class OAuthConnectorTest : Spec() {
    init {
        val authServiceMock: OAuth20Service = getMock()
        val mapperMock: ObjectMapper = getMock()

        val oAuthClient = OAuthConnector(
            oAuth20Service = authServiceMock,
            objectMapper = mapperMock,
            token = "123"
        )

        val accessTokenMock: OAuth2AccessToken = getMock()
        val responseMock: ScribeResponse = getMock()
        val requestCaptor: ArgumentCaptor<OAuthRequest> = ArgumentCaptor.forClass(OAuthRequest::class.java)

        "executeRequest" should {
            val verbGen: Gen<Verb> = object : Gen<Verb> {
                private val verbs: List<Verb> = listOf(
                    Verb.GET,
                    Verb.POST,
                    Verb.PUT,
                    Verb.PATCH,
                    Verb.DELETE,
                    Verb.HEAD,
                    Verb.OPTIONS,
                    Verb.TRACE
                )

                private var i = 0

                override fun generate(): Verb = verbs[i].also {
                    i++
                    if (i == verbs.size) i = 0
                }
            }

            "make an HTTP request with the given Verb in a url and deserialize it" {
                forAll(verbGen) {
                    on(authServiceMock.refreshAccessToken(any())).thenReturn(accessTokenMock)
                    on(authServiceMock.execute(ArgumentMatchers.any())).thenReturn(responseMock)
                    on(responseMock.code).thenReturn(200)
                    on(responseMock.body).thenReturn("{}")
                    on(responseMock.headers).thenReturn(emptyMap())
                    on(mapperMock.readValue(any(String::class.java), any(TypeReference::class.java))).thenReturn(null)

                    val expected = Response(
                        objectMapper = mapperMock,
                        body = "{}",
                        status = 200,
                        headers = emptyMap()
                    )
                    val actual = oAuthClient.executeRequest(it, "/123")
                        .getOrElse { throw NoSuchElementException() }

                    actual shouldBeEqual expected

                    verify(authServiceMock, atLeastOnce()).refreshAccessToken(eq("123"))
                    verify(authServiceMock, atLeastOnce()).signRequest(eq(accessTokenMock), requestCaptor.capture())
                    verify(responseMock, atLeastOnce()).body
                    requestCaptor.value.url shouldBe "/123"
                    requestCaptor.value.verb == it
                }
            }

            "return Left with HttpException on error" {
                forAll(Gen.choose(400, 599), verbGen) { status, verb ->
                    on(authServiceMock.refreshAccessToken(any())).thenReturn(accessTokenMock)
                    on(authServiceMock.execute(ArgumentMatchers.any())).thenReturn(responseMock)
                    on(responseMock.code).thenReturn(status)
                    on(responseMock.message).thenReturn("ERROR")

                    val actual = oAuthClient.executeRequest(verb, "/123")

                    verify(authServiceMock, atLeastOnce()).refreshAccessToken(eq("123"))
                    verify(authServiceMock, atLeastOnce()).signRequest(eq(accessTokenMock), requestCaptor.capture())
                    requestCaptor.value.url shouldBe "/123"
                    requestCaptor.value.verb shouldBe verb

                    actual should { it.isLeft() }
                    actual.mapLeft { it is HttpException }.fold({ it }, { false })
                }
            }
        }
    }
}