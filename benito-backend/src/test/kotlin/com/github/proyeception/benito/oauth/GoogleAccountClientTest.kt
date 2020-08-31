package com.github.proyeception.benito.oauth

import arrow.core.left
import arrow.core.right
import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.Spec
import com.github.proyeception.benito.connector.DynamicOAuthConnector
import com.github.proyeception.benito.connector.Response
import com.github.proyeception.benito.dto.GoogleProfileDTO
import com.github.proyeception.benito.dto.GoogleProfileMetadataDTO
import com.github.proyeception.benito.mock.eq
import com.github.proyeception.benito.mock.getMock
import com.github.proyeception.benito.mock.on
import io.kotlintest.matchers.shouldBe
import io.kotlintest.matchers.shouldThrow
import org.mockito.ArgumentMatchers.any

class GoogleAccountClientTest : Spec() {
    init {
        val googleConnectorMock: DynamicOAuthConnector = getMock()
        val googleAccountClient = GoogleAccountClient(
            googleAccountConnector = googleConnectorMock
        )

        "userInfo" should {
            "ask the connector to fetch the user and deserialize it" {
                val responseMock: Response = getMock()
                val profile = GoogleProfileDTO(
                    emailAddresses = emptyList(),
                    photos = emptyList(),
                    names = emptyList(),
                    metadata = GoogleProfileMetadataDTO(
                        sources = emptyList()
                    )
                )
                on(googleConnectorMock.get(
                    url = eq(
                        "https://people.googleapis.com/v1/people/me?personFields=metadata,names,emailAddresses,photos"
                    ),
                    token = eq("123")
                ))
                    .thenReturn(responseMock.right())
                on(responseMock.deserializeAs(any(TypeReference::class.java))).thenReturn(profile)
                val expected = profile
                val actual = googleAccountClient.userInfo("123")

                actual shouldBe expected
            }

            "throw if the connector returns left" {
                on(googleConnectorMock.get(
                    url = eq(
                        "https://people.googleapis.com/v1/people/me?personFields=metadata,names,emailAddresses,photos"
                    ),
                    token = eq("123")
                ))
                    .thenReturn(RuntimeException("error").left())

                shouldThrow<RuntimeException> {
                    googleAccountClient.userInfo("123")
                }
            }
        }
    }
}