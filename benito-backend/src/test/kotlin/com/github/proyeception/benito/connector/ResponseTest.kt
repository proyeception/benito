package com.github.proyeception.benito.connector

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.Spec
import com.github.proyeception.benito.mock.eq
import com.github.proyeception.benito.mock.getMock
import io.kotlintest.properties.Gen
import io.kotlintest.properties.forAll
import io.kotlintest.properties.forNone
import org.mockito.Mockito

open class ResponseTest : Spec() {
    init {
        val objectMapperMock: ObjectMapper = getMock()

        "isError should be true for any number between 400 and 599" {
            forAll(Gen.choose(400, 599)) { x: Int ->
                val response = Response(
                    headers = emptyMap(),
                    status = x,
                    objectMapper = objectMapperMock,
                    body = "Foo"
                )

                response.isError()
            }
        }

        "isError should be false for any other number outside of said range" {
            val assertion = { x: Int ->
                val response = Response(
                    headers = emptyMap(),
                    status = x,
                    objectMapper = objectMapperMock,
                    body = "Foo"
                )

                response.isError()
            }

            forNone(Gen.choose(0, 399), assertion)
            forNone(Gen.choose(600, Int.MAX_VALUE), assertion)
        }

        "deserializeAs should pass its body and the type reference to the objectMapper" {
            forAll { s: String ->
                val response = Response(
                    headers = emptyMap(),
                    status = 200,
                    objectMapper = objectMapperMock,
                    body = s
                )

                val typeReference = object : TypeReference<Any>() {}
                response.deserializeAs(typeReference)
                Mockito.verify(objectMapperMock).readValue(eq(s), eq(typeReference))
                true
            }
        }
    }
}