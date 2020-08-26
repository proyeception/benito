package com.github.proyeception.benito.connector

import arrow.core.Either
import arrow.core.left
import arrow.core.right
import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.exception.HttpException
import com.github.proyeception.benito.extension.isError
import com.github.scribejava.core.builder.ServiceBuilder
import com.github.scribejava.core.builder.api.DefaultApi20
import com.github.scribejava.core.model.OAuthRequest
import com.github.scribejava.core.model.Verb
import com.github.scribejava.core.oauth.OAuth20Service
import com.typesafe.config.Config
import org.slf4j.LoggerFactory


open class OAuthConnector(
    val oAuth20Service: OAuth20Service,
    var token: String,
    protected val objectMapper: ObjectMapper
) {
    fun executeRequest(
        verb: Verb,
        url: String,
        vararg bodyParts: Pair<String, ByteArray>
    ): Either<Throwable, Response> {
        val accessToken = oAuth20Service.refreshAccessToken(this.token)
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

    fun get(url: String): Either<Throwable, Response> = executeRequest(
        verb = Verb.GET,
        url = url
    )

    fun post(url: String): Either<Throwable, Response> = post(url)

    fun post(url: String, vararg bodyParts: Pair<String, ByteArray>): Either<Throwable, Response> = executeRequest(
            Verb.POST,
            url,
            *bodyParts
        )

    fun delete(url: String): Either<Throwable, Response> = executeRequest(
        verb = Verb.DELETE,
        url = url
    )

    fun put(url: String): Either<Throwable, Response> = executeRequest(
        verb = Verb.PUT,
        url = url
    )

    fun patch(url: String): Either<Throwable, Response> = executeRequest(
        verb = Verb.PATCH,
        url = url
    )

    companion object {
        private val LOGGER = LoggerFactory.getLogger(OAuthConnector::class.java)

        fun create(
            moduleConfig: Config,
            objectMapper: ObjectMapper,
            api: DefaultApi20
        ): OAuthConnector = OAuthConnector(
            oAuth20Service = ServiceBuilder(moduleConfig.getString("id"))
                .apiSecret(moduleConfig.getString("secret"))
                .callback(moduleConfig.getString("callback"))
                .defaultScope(moduleConfig.getString("scope"))
                .build(api),
            token = moduleConfig.getString("token"),
            objectMapper = objectMapper
        )
    }
}