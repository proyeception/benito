package com.github.proyeception.benito.connector

import arrow.core.Either
import arrow.core.left
import arrow.core.right
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.exception.FailedDependencyException
import com.github.proyeception.benito.exception.HttpException
import com.github.proyeception.benito.extension.isError
import com.github.proyeception.benito.utils.FileHelper
import com.github.scribejava.core.model.OAuth2AccessToken
import com.github.scribejava.core.model.OAuthRequest
import com.github.scribejava.core.model.Verb
import com.github.scribejava.core.oauth.OAuth20Service
import org.slf4j.LoggerFactory
import java.io.File

abstract class AbstractOAuthConnector(
    private val oAuth20Service: OAuth20Service,
    private val objectMapper: ObjectMapper,
    private val fileHelper: FileHelper
) {
    fun accessToken(authorization: String): OAuth2AccessToken = oAuth20Service.getAccessToken(authorization)

    fun createAuthorizationUrl(state: String, additionalParams: MutableMap<String, String>): String = oAuth20Service
        .createAuthorizationUrlBuilder()
        .state(state)
        .additionalParams(additionalParams)
        .build()

    fun executeRequest(
        verb: Verb,
        url: String,
        token: String,
        body: OAuthRequestBody?
    ): Either<Throwable, HttpResponse> {
        val accessToken = oAuth20Service.refreshAccessToken(token)
        val request = OAuthRequest(verb, url)
        body?.let { b ->
            when (b) {
                is MultipartBody -> {
                    request.initMultipartPayload()
                    b.parts.forEach {
                        request.addByteArrayBodyPartPayloadInMultipartPayload(it.second, it.first)
                    }
                }
                is JsonBody -> {
                    request.addHeader("Content-Type", "application/json;charset=UTF-8")
                    request.setPayload(objectMapper.writeValueAsString(b.body))
                }
            }
        }
        oAuth20Service.signRequest(accessToken, request)
        val response = oAuth20Service.execute(request)

        if (response.code.isError()) {
            LOGGER.error(response.message, response.body)
            return HttpException.of(response.code, response.message).left()
        }

        return HttpResponse(
            objectMapper = objectMapper,
            body = response.body,
            status = response.code,
            headers = response.headers
        ).right()
    }

    protected open fun downloadFile(
        url: String,
        token: String,
        filePath: String
    ): File {
        val accessToken = oAuth20Service.refreshAccessToken(token)
        val request = OAuthRequest(Verb.GET, url)
        oAuth20Service.signRequest(accessToken, request)
        val response = oAuth20Service.execute(request)

        if (response.code.isError()) {
            LOGGER.error(response.message, response.body)
            throw FailedDependencyException("Failed to download file at $url")
        }

        return fileHelper.createFileFromInputStream(filePath, response.stream)
    }

    protected open fun get(url: String, token: String): Either<Throwable, HttpResponse> = executeRequest(
        verb = Verb.GET,
        url = url,
        token = token,
        body = null
    )

    protected open fun post(url: String, token: String): Either<Throwable, HttpResponse> = post(
        url = url,
        token = token,
        body = null
    )

    protected open fun post(url: String, body: Any?, token: String): Either<Throwable, HttpResponse> = executeRequest(
        verb = Verb.POST,
        url = url,
        token = token,
        body = body?.let { JsonBody(it) }
    )

    protected open fun post(
        url: String,
        token: String,
        vararg bodyParts: Pair<String, ByteArray>
    ): Either<Throwable, HttpResponse> = executeRequest(
        verb = Verb.POST,
        url = url,
        token = token,
        body = MultipartBody(*bodyParts)
    )

    protected open fun delete(url: String, token: String): Either<Throwable, HttpResponse> = executeRequest(
        verb = Verb.DELETE,
        url = url,
        token = token,
        body = null
    )

    protected open fun put(url: String, token: String): Either<Throwable, HttpResponse> = executeRequest(
        verb = Verb.PUT,
        url = url,
        token = token,
        body = null
    )

    protected open fun patch(url: String, token: String): Either<Throwable, HttpResponse> = executeRequest(
        verb = Verb.PATCH,
        url = url,
        token = token,
        body = null
    )

    companion object {
        private val LOGGER = LoggerFactory.getLogger(AbstractOAuthConnector::class.java)
    }
}