package com.github.proyeception.benito.oauth

import com.github.scribejava.core.builder.ServiceBuilder
import com.github.scribejava.core.builder.api.DefaultApi20
import com.github.scribejava.core.model.OAuth2AccessToken
import com.github.scribejava.core.model.OAuthRequest
import com.github.scribejava.core.model.Response
import com.github.scribejava.core.model.Verb
import com.github.scribejava.core.oauth.OAuth20Service
import sun.net.www.protocol.jar.URLJarFileCallBack


abstract class OAuthClient(oAuth20Service: OAuth20Service, token: String){

    protected var oAuth20Service:OAuth20Service = oAuth20Service
    protected var token:String = token

    constructor(instance: DefaultApi20, scope: String, clientId: String, clientSecret: String, callback: String, oAuth20Service: OAuth20Service, token: String) : this(
            oAuth20Service = ServiceBuilder(clientId)
                    .apiSecret(clientSecret)
                    .callback(callback)
                    .defaultScope(scope)
                    .build(instance),
            token = token
    )

    private fun executeRequest(verb: Verb, url: String): Response {
        var accessToken: OAuth2AccessToken  = oAuth20Service.refreshAccessToken(this.token);
        var request:OAuthRequest = OAuthRequest(Verb.GET, url);
        oAuth20Service.signRequest(accessToken, request);
        var response:Response = oAuth20Service.execute(request);
        return response
    }

    fun get(url: String):Response {
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

    abstract fun initNewAuth():String;

    abstract fun finishNewAuth(authorization:String):String;
}