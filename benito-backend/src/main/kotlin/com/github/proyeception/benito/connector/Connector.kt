package com.github.proyeception.benito.connector

import com.fasterxml.jackson.databind.ObjectMapper
import com.typesafe.config.Config
import org.apache.http.Header
import org.apache.http.HttpEntity
import org.apache.http.HttpResponse
import org.apache.http.client.HttpClient
import org.apache.http.client.methods.*
import org.apache.http.entity.ContentType
import org.apache.http.entity.StringEntity
import org.apache.http.entity.mime.MultipartEntityBuilder
import org.apache.http.impl.client.HttpClientBuilder
import java.io.BufferedReader
import java.io.InputStreamReader

open class Connector(
    private val apacheClient: HttpClient,
    private val objectMapper: ObjectMapper,
    private val host: String
) {
    open fun get(path: String): Response = execute(path, HttpMethod.GET, null)

    open fun post(path: String): Response = post(path, null)

    open fun post(path: String, body: Any?): Response = execute(
        path,
        HttpMethod.POST,
        body?.let { SimpleJsonRequest(it) }
    )

    open fun post(path: String, multipartMetadata: MultipartMetadata) = execute(
        path,
        HttpMethod.POST,
        multipartMetadata
    )

    open fun put(path: String): Response = put(path, null)

    open fun put(path: String, body: Any?): Response = execute(
        path,
        HttpMethod.PUT,
        body?.let { SimpleJsonRequest(it) }
    )

    open fun patch(path: String): Response = patch(path, null)

    open fun patch(path: String, body: Any?): Response = execute(
        path,
        HttpMethod.PATCH,
        body?.let { SimpleJsonRequest(it) }
    )

    open fun delete(path: String): Response = execute(path, HttpMethod.DELETE, null)

    private fun execute(path: String, httpMethod: HttpMethod, body: RequestBody?): Response {
        val endpoint = "$host${if (path.startsWith("/")) path else "/$path"}"
        val request = requestOf(httpMethod, body)(endpoint)

        val response = apacheClient.execute(request)
        val responseBody = response.readBody()
        val headers = response.allHeaders.map { Pair(it.name, it.value) }.toMap()
        val status = response.statusLine.statusCode
        request.releaseConnection()

        return Response(
            headers = headers,
            body = responseBody,
            status = status,
            objectMapper = objectMapper
        )
    }

    private fun requestOf(httpMethod: HttpMethod, body: RequestBody?): (String) -> HttpRequestBase = {
        when (httpMethod) {
            HttpMethod.GET -> HttpGet(it)
            HttpMethod.POST -> HttpPost(it).also { p -> p.setBody(body) }
            HttpMethod.PATCH -> HttpPatch(it).also { p -> p.setBody(body) }
            HttpMethod.PUT -> HttpPut(it).also { p -> p.setBody(body) }
            HttpMethod.DELETE -> HttpDelete(it)
        }
    }

    private enum class HttpMethod {
        GET, POST, PUT, PATCH, DELETE
    }

    private fun HttpEntityEnclosingRequestBase.setBody(body: RequestBody?): HttpEntityEnclosingRequestBase = body?.let { b ->
        val params: HttpEntity = when (b) {
            is MultipartMetadata -> {
                val builder = MultipartEntityBuilder.create()
                b.parts.forEach {
                    val (textName, textText, textContentType) = it.textBody
                    val (binaryName, binaryFile, binaryContentType, binaryFileName) = it.binaryBody
                    builder.addTextBody(textName, textText, textContentType)
                    builder.addBinaryBody(binaryName, binaryFile, binaryContentType, binaryFileName)
                }
                builder.build()
            }
            is SimpleJsonRequest -> StringEntity(objectMapper.writeValueAsString(b.body), ContentType.APPLICATION_JSON)
        }
        this.entity = params
        return this
    } ?: this

    private fun HttpResponse.readBody(): String? = this.entity?.content
        ?.let { BufferedReader(InputStreamReader(it)) }
        ?.readLine()

    companion object {
        fun create(
            objectMapper: ObjectMapper,
            moduleConfig: Config,
            defaultHeaders: List<Header> = emptyList()
        ): Connector {
            return Connector(
                objectMapper = objectMapper,
                host = moduleConfig.getString("host"),
                apacheClient = HttpClientBuilder.create()
                    .setDefaultHeaders(defaultHeaders)
                    .build()
            )
        }
    }
}