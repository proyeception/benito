package com.github.proyeception.benito.connector

import arrow.core.Either
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.utils.FileHelper
import com.github.scribejava.core.builder.ServiceBuilder
import com.github.scribejava.core.builder.api.DefaultApi20
import com.github.scribejava.core.oauth.OAuth20Service
import com.typesafe.config.Config

open class OAuthConnector(
    oAuth20Service: OAuth20Service,
    objectMapper: ObjectMapper,
    fileHelper: FileHelper,
    private val token: String
) : AbstractOAuthConnector(
    oAuth20Service = oAuth20Service,
    objectMapper = objectMapper,
    fileHelper = fileHelper
) {

    open fun downloadFile(url: String, filePath: String) = downloadFile(
        url = url,
        token = token,
        filePath = filePath
    )

    open fun get(url: String): Either<Throwable, HttpResponse> = get(url, token)

    open fun post(url: String): Either<Throwable, HttpResponse> = post(url, token)

    open fun post(url: String, body: Any?): Either<Throwable, HttpResponse> = post(url, body, token)

    open fun post(url: String, vararg bodyParts: Pair<String, ByteArray>): Either<Throwable, HttpResponse> = post(
        url,
        token,
        *bodyParts
    )

    open fun delete(url: String): Either<Throwable, HttpResponse> = delete(url, token)

    open fun put(url: String): Either<Throwable, HttpResponse> = put(url, token)

    open fun patch(url: String): Either<Throwable, HttpResponse> = patch(url, token)

    companion object {
        fun create(
            moduleConfig: Config,
            objectMapper: ObjectMapper,
            api: DefaultApi20,
            moduleName: String
        ): OAuthConnector = OAuthConnector(
            oAuth20Service = ServiceBuilder(System.getenv("${moduleName.toUpperCase()}_ID")
                ?: moduleConfig.getString("id"))
                .apiSecret(System.getenv("${moduleName.toUpperCase()}_SECRET") ?: moduleConfig.getString("secret"))
                .callback(moduleConfig.getString("callback"))
                .defaultScope(moduleConfig.getString("scope"))
                .build(api),
            token = System.getenv("${moduleName.toUpperCase()}_TOKEN") ?: moduleConfig.getString("token"),
            objectMapper = objectMapper,
            fileHelper = FileHelper()
        )
    }
}