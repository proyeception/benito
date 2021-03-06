package com.github.proyeception.benito.snapshot

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.Spec
import com.github.proyeception.benito.connector.HttpConnector
import com.github.proyeception.benito.connector.HttpResponse
import com.github.proyeception.benito.mock.eq
import com.github.proyeception.benito.mock.getMock
import com.github.proyeception.benito.mock.on
import io.kotlintest.matchers.shouldBe
import org.mockito.ArgumentMatchers.any
import org.mockito.ArgumentMatchers.anyString
import org.mockito.Mockito.verify

class SnapshotTest : Spec() {
    init {
        val connectorMock: HttpConnector = getMock()
        val snapshot = object : Snapshot<Any?>(
            refreshRate = 100,
            endpoint = "/snap",
            name = "snap",
            connector = connectorMock,
            ref = object : TypeReference<List<Any?>>() {}
        ){
            fun elements() = super.elements
        }

        "refresh" should {
            "make a GET to the endpoint and check the status code" {
                val responseMock: HttpResponse = getMock()
                on(connectorMock.get(anyString())).thenReturn(responseMock)
                on(responseMock.isError()).thenReturn(false)
                on(responseMock.deserializeAs(any(TypeReference::class.java))).thenReturn(listOf(1, 2, 3))

                snapshot.refresh()

                verify(connectorMock).get(eq("/snap"))

                snapshot.elements() shouldBe listOf(1, 2, 3)
            }
        }
    }
}