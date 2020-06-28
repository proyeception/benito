package com.github.proyeception.benito.connector

import org.apache.http.HttpResponse
import org.apache.http.client.HttpClient
import org.apache.http.client.methods.HttpEntityEnclosingRequestBase
import org.apache.http.client.methods.HttpGet
import org.apache.http.client.methods.HttpPost
import org.apache.http.client.methods.HttpRequestBase
import org.apache.http.entity.ContentType
import org.apache.http.entity.StringEntity
import org.slf4j.LoggerFactory
import java.io.BufferedReader
import java.io.InputStreamReader

class Connector(
    private val apacheClient: HttpClient,
    private val host: String
) {
    fun get(path: String): Response = execute(HttpGet("$host/$path"))

    fun post(path: String, body: String): Response = execute(HttpPost("$host/$path").also { it.setBody(body) })

    private fun execute(request: HttpRequestBase): Response {
        val response = apacheClient.execute(request)
        val body = response.entity?.content?.let { BufferedReader(InputStreamReader(it)) }?.readLine()
        val headers = response.allHeaders.map { Pair(it.name, it.value) }.toMap()
        val status = response.statusLine.statusCode
        request.releaseConnection()

        return Response(
            headers = headers,
            body = body,
            status = status
        )
    }

    private fun HttpEntityEnclosingRequestBase.setBody(body: String): HttpEntityEnclosingRequestBase {
        val params: StringEntity = StringEntity(body, ContentType.APPLICATION_JSON)
        this.entity = params
        return this
    }

    private fun readBody(response: HttpResponse): String? = response.entity?.content
        ?.let { BufferedReader(InputStreamReader(it)) }
        ?.readLine()

    companion object {
        private val LOGGER = LoggerFactory.getLogger(Connector::class.java)
    }
}