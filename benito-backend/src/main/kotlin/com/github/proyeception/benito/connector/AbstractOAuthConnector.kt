package com.github.proyeception.benito.connector

import arrow.core.Either
import arrow.core.left
import arrow.core.right
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.exception.HttpException
import com.github.proyeception.benito.extension.isError
import com.github.scribejava.core.model.OAuth2AccessToken
import com.github.scribejava.core.model.OAuthRequest
import com.github.scribejava.core.model.Verb
import com.github.scribejava.core.oauth.OAuth20Service
import org.slf4j.LoggerFactory

abstract class AbstractOAuthConnector(
    private val oAuth20Service: OAuth20Service,
    private val objectMapper: ObjectMapper
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
        vararg bodyParts: Pair<String, ByteArray>
    ): Either<Throwable, Response> {
        val accessToken = oAuth20Service.refreshAccessToken(token)
        val request = OAuthRequest(verb, url)
        if (bodyParts.isNotEmpty()) request.initMultipartPayload()
        bodyParts.forEach {
            request.addByteArrayBodyPartPayloadInMultipartPayload(it.second, it.first)
        }
        oAuth20Service.signRequest(accessToken, request)
        val response = oAuth20Service.execute(request)

        if (response.code.isError()) {
            LOGGER.error(response.message, response.body)
            return HttpException.of(response.code, response.message).left()
        }

        return Response(
            objectMapper = objectMapper,
            body = response.body,
            status = response.code,
            headers = response.headers
        ).right()
    }

    protected open fun get(url: String, token: String): Either<Throwable, Response> = executeRequest(
        verb = Verb.GET,
        url = url,
        token = token
    )

    protected open fun post(url: String, token: String): Either<Throwable, Response> = post(url, token)

    protected open fun post(url: String, token: String, vararg bodyParts: Pair<String, ByteArray>): Either<Throwable, Response> =
        executeRequest(
            Verb.POST,
            url,
            token,
            *bodyParts
        )

    protected open fun delete(url: String, token: String): Either<Throwable, Response> = executeRequest(
        verb = Verb.DELETE,
        url = url,
        token = token
    )

    protected open fun put(url: String, token: String): Either<Throwable, Response> = executeRequest(
        verb = Verb.PUT,
        url = url,
        token = token
    )

    protected open fun patch(url: String, token: String): Either<Throwable, Response> = executeRequest(
        verb = Verb.PATCH,
        url = url,
        token = token
    )

    companion object {
        private val LOGGER = LoggerFactory.getLogger(AbstractOAuthConnector::class.java)
    }
}