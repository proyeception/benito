package com.github.proyeception.benito.oauth

import com.github.scribejava.core.builder.ServiceBuilder
import com.github.scribejava.core.builder.api.DefaultApi20
import com.github.scribejava.core.model.OAuthRequest
import com.github.scribejava.core.model.Response
import com.github.scribejava.core.model.Verb
import com.github.scribejava.core.oauth.OAuth20Service


abstract class OAuthClient(
    protected var oAuth20Service: OAuth20Service,
    protected var token: String
) {

    constructor(
        instance: DefaultApi20,
        scope: String,
        clientId: String,
        clientSecret: String,
        callbackRoute: String,
        token: String
    ) : this(
        oAuth20Service = ServiceBuilder(clientId)
            .apiSecret(clientSecret)
            .callback(callbackRoute)
            .defaultScope(scope)
            .build(instance),
        token = token
    )

    private fun executeRequest(verb: Verb, url: String): Response {
        val accessToken = oAuth20Service.refreshAccessToken(this.token)
        val request = OAuthRequest(verb, url)
        oAuth20Service.signRequest(accessToken, request)
        return oAuth20Service.execute(request)
    }

    fun get(url: String): Response {
        return executeRequest(Verb.GET, url)
    }

    fun post(url: String) {
        executeRequest(Verb.POST, url)
    }

    fun delete(url: String) {
        executeRequest(Verb.DELETE, url)
    }

    fun put(url: String) {
        executeRequest(Verb.PUT, url)
    }

    fun patch(url: String) {
        executeRequest(Verb.PATCH, url)
    }

    abstract fun initNewAuth(): String

    abstract fun finishNewAuth(authorization: String): String
}