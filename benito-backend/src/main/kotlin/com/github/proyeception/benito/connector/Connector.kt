package com.github.proyeception.benito.connector

import arrow.fx.IO
import com.fasterxml.jackson.databind.ObjectMapper
import org.apache.http.HttpResponse
import org.apache.http.client.HttpClient
import org.apache.http.client.methods.HttpEntityEnclosingRequestBase
import org.apache.http.client.methods.HttpGet
import org.apache.http.client.methods.HttpPost
import org.apache.http.client.methods.HttpRequestBase
import org.apache.http.entity.ContentType
import org.apache.http.entity.StringEntity
import java.io.BufferedReader
import java.io.InputStreamReader

open class Connector(
    private val apacheClient: HttpClient,
    private val objectMapper: ObjectMapper,
    private val host: String
) {
    open fun get(path: String): IO<Response> = execute(HttpGet("$host/$path"))

    open fun post(path: String, body: Any): IO<Response> = execute(HttpPost("$host/$path").also { it.setBody(body) })

    private fun execute(request: HttpRequestBase): IO<Response> = IO {
        val response = apacheClient.execute(request)
        val body = response.readBody()
        val headers = response.allHeaders.map { Pair(it.name, it.value) }.toMap()
        val status = response.statusLine.statusCode
        request.releaseConnection()

        Response(
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