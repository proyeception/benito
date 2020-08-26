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