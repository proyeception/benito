package com.github.proyeception.benito.oauth

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
import org.slf4j.LoggerFactory


abstract class OAuthClient(
    protected val oAuth20Service: OAuth20Service,
    protected var token: String,
    protected val objectMapper: ObjectMapper
) {
    constructor(
        instance: DefaultApi20,
        scope: String,
        clientId: String,
        clientSecret: String,
        callbackRoute: String,
        token: String,
        objectMapper: ObjectMapper
    ) : this(
        oAuth20Service = ServiceBuilder(clientId)
            .apiSecret(clientSecret)
            .callback(callbackRoute)
            .defaultScope(scope)
            .build(instance),
        token = token,
        objectMapper = objectMapper
    )

    fun <T> executeRequest(
        verb: Verb,
        url: String,
        ref: TypeReference<T>,
        vararg bodyParts: Pair<String, ByteArray>
    ): Either<Throwable, T> {
        val accessToken = oAuth20Service.refreshAccessToken(this.token)
        val request = OAuthRequest(verb, url)
        if (bodyParts.isNotEmpty()) {
            request.initMultipartPayload()
//            request.addHeader("Content-Type", "multipart/form-data")
        }
        bodyParts.forEach {
            request.addByteArrayBodyPartPayloadInMultipartPayload(it.second, it.first)
        }
        oAuth20Service.signRequest(accessToken, request)
        val response = oAuth20Service.execute(request)

        if (response.code.isError()) {
            LOGGER.error(response.message, response.body)
            return HttpException.of(response.code, response.message).left()
        }

        return objectMapper.readValue(response.body, ref).right()
    }

    fun <T> get(url: String, ref: TypeReference<T>): Either<Throwable, T> = executeRequest(
        verb = Verb.GET,
        url = url,
        ref = ref
    )

    fun <T> post(url: String, ref: TypeReference<T>): Either<Throwable, T> = post(url, ref)

    fun <T> post(url: String, ref: TypeReference<T>, vararg bodyParts: Pair<String, ByteArray>): Either<Throwable, T> =
        executeRequest(
            Verb.POST,
            url,
            ref,
            *bodyParts
        )

    fun <T> delete(url: String, ref: TypeReference<T>): Either<Throwable, T> = executeRequest(
        verb = Verb.DELETE,
        url = url,
        ref = ref
    )

    fun <T> put(url: String, ref: TypeReference<T>): Either<Throwable, T> = executeRequest(
        verb = Verb.PUT,
        url = url,
        ref = ref
    )

    fun <T> patch(url: String, ref: TypeReference<T>): Either<Throwable, T> = executeRequest(
        verb = Verb.PATCH,
        url = url,
        ref = ref
    )

    abstract fun initNewAuth(): String

    abstract fun finishNewAuth(authorization: String): String

    companion object {
        private val LOGGER = LoggerFactory.getLogger(OAuthClient::class.java)
    }
}