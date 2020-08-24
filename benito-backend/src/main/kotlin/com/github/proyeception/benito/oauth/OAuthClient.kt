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


abstract class OAuthClient(
    protected var oAuth20Service: OAuth20Service,
    protected var token: String,
    private val objectMapper: ObjectMapper
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

    fun <T> executeRequest(verb: Verb, url: String, ref: TypeReference<T>): Either<Throwable, T> {
        val accessToken = oAuth20Service.refreshAccessToken(this.token)
        val request = OAuthRequest(verb, url)
        oAuth20Service.signRequest(accessToken, request)
        val response = oAuth20Service.execute(request)

        if (response.code.isError()) {
            return HttpException.of(response.code, response.message).left()
        }

        return objectMapper.readValue(response.body, ref).right()
    }

    fun <T> get(url: String, ref: TypeReference<T>): Either<Throwable, T> = executeRequest(Verb.GET, url, ref)

    fun <T> post(url: String, ref: TypeReference<T>): Either<Throwable, T> = executeRequest(Verb.POST, url, ref)

    fun <T> delete(url: String, ref: TypeReference<T>): Either<Throwable, T> = executeRequest(Verb.DELETE, url, ref)

    fun <T> put(url: String, ref: TypeReference<T>): Either<Throwable, T> = executeRequest(Verb.PUT, url, ref)

    fun <T> patch(url: String, ref: TypeReference<T>): Either<Throwable, T> = executeRequest(Verb.PATCH, url, ref)

    abstract fun initNewAuth(): String

    abstract fun finishNewAuth(authorization: String): String
}