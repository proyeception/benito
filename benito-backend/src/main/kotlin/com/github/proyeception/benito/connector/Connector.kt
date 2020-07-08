package com.github.proyeception.benito.connector

import com.fasterxml.jackson.databind.ObjectMapper
import org.apache.http.HttpResponse
import org.apache.http.client.HttpClient
import org.apache.http.client.methods.*
import org.apache.http.entity.ContentType
import org.apache.http.entity.StringEntity
import java.io.BufferedReader
import java.io.InputStreamReader

open class Connector(
    private val apacheClient: HttpClient,
    private val objectMapper: ObjectMapper,
    private val host: String
) {
    open fun get(path: String): Response = execute(HttpGet("$host/$path"))

    open fun post(path: String): Response = post(path, null)

    open fun post(path: String, body: Any?): Response = execute(HttpPost("$host/$path").also { it.setBody(body) })

    open fun put(path: String): Response = put(path, null)

    open fun put(path: String, body: Any?): Response = execute(HttpPut("$host/$path").also { it.setBody(body) })

    open fun patch(path: String): Response = patch(path, null)

    open fun patch(path: String, body: Any?): Response = execute(HttpPatch("$host/$path").also { it.setBody(body) })

    open fun delete(path: String, body: Any?): Response = execute(HttpDelete("$host/$path"))

    private fun execute(request: HttpRequestBase): Response {
        val response = apacheClient.execute(request)
        val body = response.readBody()
        val headers = response.allHeaders.map { Pair(it.name, it.value) }.toMap()
        val status = response.statusLine.statusCode
        request.releaseConnection()

        return Response(
            headers = headers,
            body = body,
            status = status,
            objectMapper = objectMapper
        )
    }

    private fun HttpEntityEnclosingRequestBase.setBody(body: Any?): HttpEntityEnclosingRequestBase = body?.let { b ->
        val params = StringEntity(objectMapper.writeValueAsString(b), ContentType.APPLICATION_JSON)
        this.entity = params
        return this
    } ?: this

    private fun HttpResponse.readBody(): String? = this.entity?.content
        ?.let { BufferedReader(InputStreamReader(it)) }
        ?.readLine()
}