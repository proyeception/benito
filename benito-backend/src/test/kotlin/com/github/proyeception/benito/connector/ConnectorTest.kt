package com.github.proyeception.benito.connector

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.Spec
import com.github.proyeception.benito.mock.eq
import com.github.proyeception.benito.mock.getMock
import com.github.proyeception.benito.mock.on
import com.github.proyeception.benito.mock.shouldBeEqual
import org.apache.http.HttpEntity
import org.apache.http.HttpResponse
import org.apache.http.StatusLine
import org.apache.http.client.HttpClient
import org.apache.http.client.methods.*
import org.apache.http.message.BasicHeader
import org.mockito.ArgumentMatchers.any
import org.mockito.Mockito.never
import org.mockito.Mockito.verify

open class ConnectorTest : Spec() {
    init {
        data class TestObject(
            val data: String
        )

        val apacheClientMock: HttpClient = getMock()
        val objectMapperMock: ObjectMapper = getMock()
        val connector = Connector(
            host = "localhost",
            apacheClient = apacheClientMock,
            objectMapper = objectMapperMock
        )

        "get should execute without any body" {
            val responseMock: HttpResponse = getMock()
            val entityMock: HttpEntity = getMock()
            val statusLineMock: StatusLine = getMock()

            on(apacheClientMock.execute(any())).thenReturn(responseMock)
            on(responseMock.entity).thenReturn(entityMock)
            on(entityMock.content).thenReturn("TEST".byteInputStream())
            on(responseMock.allHeaders).thenReturn(arrayOf(BasicHeader("Foo", "Bar")))
            on(responseMock.statusLine).thenReturn(statusLineMock)
            on(statusLineMock.statusCode).thenReturn(200)

            val expected = Response(
                headers = mapOf("Foo" to "Bar"),
                body = "TEST",
                status = 200,
                objectMapper = objectMapperMock
            )
            val actual = connector.get("hello")

            expected shouldBeEqual actual

            verify(apacheClientMock).execute(any(HttpGet::class.java))
            verify(objectMapperMock, never()).writeValueAsString(any())
        }

        "post should execute without body" {
            val responseMock: HttpResponse = getMock()
            val entityMock: HttpEntity = getMock()
            val statusLineMock: StatusLine = getMock()

            on(apacheClientMock.execute(any())).thenReturn(responseMock)
            on(responseMock.entity).thenReturn(entityMock)
            on(entityMock.content).thenReturn("TEST".byteInputStream())
            on(responseMock.allHeaders).thenReturn(arrayOf(BasicHeader("Foo", "Bar")))
            on(responseMock.statusLine).thenReturn(statusLineMock)
            on(statusLineMock.statusCode).thenReturn(200)

            val expected = Response(
                headers = mapOf("Foo" to "Bar"),
                body = "TEST",
                status = 200,
                objectMapper = objectMapperMock
            )
            val actual = connector.post("hello")

            expected shouldBeEqual actual

            verify(apacheClientMock).execute(any(HttpPost::class.java))
            verify(objectMapperMock, never()).writeValueAsString(any())
        }

        "post should convert to string if it is not null" {
            val responseMock: HttpResponse = getMock()
            val entityMock: HttpEntity = getMock()
            val statusLineMock: StatusLine = getMock()

            on(objectMapperMock.writeValueAsString(any())).thenReturn("foo")
            on(apacheClientMock.execute(any())).thenReturn(responseMock)
            on(responseMock.entity).thenReturn(entityMock)
            on(entityMock.content).thenReturn("TEST".byteInputStream())
            on(responseMock.allHeaders).thenReturn(arrayOf(BasicHeader("Foo", "Bar")))
            on(responseMock.statusLine).thenReturn(statusLineMock)
            on(statusLineMock.statusCode).thenReturn(200)

            val expected = Response(
                headers = mapOf("Foo" to "Bar"),
                body = "TEST",
                status = 200,
                objectMapper = objectMapperMock
            )
            val actual = connector.post("hello", TestObject(data = "foo"))

            expected shouldBeEqual actual

            verify(apacheClientMock).execute(any(HttpPost::class.java))
            verify(objectMapperMock).writeValueAsString(eq(TestObject(data = "foo")))
        }

        "put should execute without body" {
            val responseMock: HttpResponse = getMock()
            val entityMock: HttpEntity = getMock()
            val statusLineMock: StatusLine = getMock()

            on(apacheClientMock.execute(any())).thenReturn(responseMock)
            on(responseMock.entity).thenReturn(entityMock)
            on(entityMock.content).thenReturn("TEST".byteInputStream())
            on(responseMock.allHeaders).thenReturn(arrayOf(BasicHeader("Foo", "Bar")))
            on(responseMock.statusLine).thenReturn(statusLineMock)
            on(statusLineMock.statusCode).thenReturn(200)

            val expected = Response(
                headers = mapOf("Foo" to "Bar"),
                body = "TEST",
                status = 200,
                objectMapper = objectMapperMock
            )
            val actual = connector.put("hello")

            expected shouldBeEqual actual

            verify(apacheClientMock).execute(any(HttpPut::class.java))
            verify(objectMapperMock, never()).writeValueAsString(any())
        }

        "put should convert to string if it is not null" {
            val responseMock: HttpResponse = getMock()
            val entityMock: HttpEntity = getMock()
            val statusLineMock: StatusLine = getMock()

            on(objectMapperMock.writeValueAsString(any())).thenReturn("foo")
            on(apacheClientMock.execute(any())).thenReturn(responseMock)
            on(responseMock.entity).thenReturn(entityMock)
            on(entityMock.content).thenReturn("TEST".byteInputStream())
            on(responseMock.allHeaders).thenReturn(arrayOf(BasicHeader("Foo", "Bar")))
            on(responseMock.statusLine).thenReturn(statusLineMock)
            on(statusLineMock.statusCode).thenReturn(200)

            val expected = Response(
                headers = mapOf("Foo" to "Bar"),
                body = "TEST",
                status = 200,
                objectMapper = objectMapperMock
            )
            val actual = connector.put("hello", TestObject(data = "foo"))

            expected shouldBeEqual actual

            verify(apacheClientMock).execute(any(HttpPut::class.java))
            verify(objectMapperMock).writeValueAsString(eq(TestObject(data = "foo")))
        }

        "patch should execute without body" {
            val responseMock: HttpResponse = getMock()
            val entityMock: HttpEntity = getMock()
            val statusLineMock: StatusLine = getMock()

            on(apacheClientMock.execute(any())).thenReturn(responseMock)
            on(responseMock.entity).thenReturn(entityMock)
            on(entityMock.content).thenReturn("TEST".byteInputStream())
            on(responseMock.allHeaders).thenReturn(arrayOf(BasicHeader("Foo", "Bar")))
            on(responseMock.statusLine).thenReturn(statusLineMock)
            on(statusLineMock.statusCode).thenReturn(200)

            val expected = Response(
                headers = mapOf("Foo" to "Bar"),
                body = "TEST",
                status = 200,
                objectMapper = objectMapperMock
            )
            val actual = connector.patch("hello")

            expected shouldBeEqual actual

            verify(apacheClientMock).execute(any(HttpPatch::class.java))
            verify(objectMapperMock, never()).writeValueAsString(any())
        }

        "patch should convert to string if it is not null" {
            val responseMock: HttpResponse = getMock()
            val entityMock: HttpEntity = getMock()
            val statusLineMock: StatusLine = getMock()

            on(objectMapperMock.writeValueAsString(any())).thenReturn("foo")
            on(apacheClientMock.execute(any())).thenReturn(responseMock)
            on(responseMock.entity).thenReturn(entityMock)
            on(entityMock.content).thenReturn("TEST".byteInputStream())
            on(responseMock.allHeaders).thenReturn(arrayOf(BasicHeader("Foo", "Bar")))
            on(responseMock.statusLine).thenReturn(statusLineMock)
            on(statusLineMock.statusCode).thenReturn(200)

            val expected = Response(
                headers = mapOf("Foo" to "Bar"),
                body = "TEST",
                status = 200,
                objectMapper = objectMapperMock
            )
            val actual = connector.patch("hello", TestObject(data = "foo"))

            expected shouldBeEqual actual

            verify(apacheClientMock).execute(any(HttpPatch::class.java))
            verify(objectMapperMock).writeValueAsString(eq(TestObject(data = "foo")))
        }

        "delete should execute without body" {
            val responseMock: HttpResponse = getMock()
            val entityMock: HttpEntity = getMock()
            val statusLineMock: StatusLine = getMock()

            on(apacheClientMock.execute(any())).thenReturn(responseMock)
            on(responseMock.entity).thenReturn(entityMock)
            on(entityMock.content).thenReturn("TEST".byteInputStream())
            on(responseMock.allHeaders).thenReturn(arrayOf(BasicHeader("Foo", "Bar")))
            on(responseMock.statusLine).thenReturn(statusLineMock)
            on(statusLineMock.statusCode).thenReturn(200)

            val expected = Response(
                headers = mapOf("Foo" to "Bar"),
                body = "TEST",
                status = 200,
                objectMapper = objectMapperMock
            )
            val actual = connector.delete("hello")

            expected shouldBeEqual actual

            verify(apacheClientMock).execute(any(HttpDelete::class.java))
            verify(objectMapperMock, never()).writeValueAsString(any())
        }
    }
}