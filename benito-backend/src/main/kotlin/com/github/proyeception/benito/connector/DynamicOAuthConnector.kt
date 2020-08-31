package com.github.proyeception.benito.connector

import arrow.core.Either
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.scribejava.core.builder.ServiceBuilder
import com.github.scribejava.core.builder.api.DefaultApi20
import com.github.scribejava.core.oauth.OAuth20Service
import com.typesafe.config.Config

open class DynamicOAuthConnector(
    oAuth20Service: OAuth20Service,
    objectMapper: ObjectMapper
) : AbstractOAuthConnector(
    oAuth20Service = oAuth20Service,
    objectMapper = objectMapper
) {
    public override fun get(url: String, token: String) = super.get(url, token)

    public override fun post(url: String, token: String) = super.post(url, token)

    public override fun post(
        url: String,
        token: String,
        vararg bodyParts: Pair<String, ByteArray>
    ): Either<Throwable, Response> = super.post(url, token, *bodyParts)

    public override fun put(url: String, token: String): Either<Throwable, Response> = super.put(url, token)

    public override fun patch(url: String, token: String): Either<Throwable, Response> = super.patch(url, token)

    public override fun delete(url: String, token: String): Either<Throwable, Response> = super.delete(url, token)

    companion object {
        fun create(moduleConfig: Config, objectMapper: ObjectMapper, api: DefaultApi20) = DynamicOAuthConnector(
            oAuth20Service = ServiceBuilder(moduleConfig.getString("id"))
                .apiSecret(moduleConfig.getString("secret"))
                .callback(moduleConfig.getString("callback"))
                .defaultScope(moduleConfig.getString("scope"))
                .build(api),
            objectMapper = objectMapper
        )
    }
}