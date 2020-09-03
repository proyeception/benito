package com.github.proyeception.benito.connector

import arrow.core.Either
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.scribejava.core.builder.ServiceBuilder
import com.github.scribejava.core.builder.api.DefaultApi20
import com.github.scribejava.core.oauth.OAuth20Service
import com.typesafe.config.Config


open class OAuthConnector(
    oAuth20Service: OAuth20Service,
    objectMapper: ObjectMapper,
    private val token: String
) : AbstractOAuthConnector(
    oAuth20Service = oAuth20Service,
    objectMapper = objectMapper
) {

    open fun get(url: String): Either<Throwable, Response> = get(url, token)

    open fun post(url: String): Either<Throwable, Response> = post(url, token)

    open fun post(url: String, vararg bodyParts: Pair<String, ByteArray>): Either<Throwable, Response> = post(
        url,
        token,
        *bodyParts
    )

    open fun delete(url: String): Either<Throwable, Response> = delete(url, token)

    open fun put(url: String): Either<Throwable, Response> = put(url, token)

    open fun patch(url: String): Either<Throwable, Response> = patch(url, token)

    companion object {
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