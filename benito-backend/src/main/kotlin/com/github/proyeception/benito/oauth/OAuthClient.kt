package com.github.proyeception.benito.oauth

import com.github.scribejava.core.builder.ServiceBuilder
import com.github.scribejava.core.builder.api.DefaultApi20
import com.github.scribejava.core.model.OAuth2AccessToken
import com.github.scribejava.core.model.OAuthRequest
import com.github.scribejava.core.model.Response
import com.github.scribejava.core.model.Verb
import com.github.scribejava.core.oauth.OAuth20Service
import sun.net.www.protocol.jar.URLJarFileCallBack


abstract class OAuthClient(service: OAuth20Service, token: String){

    protected var service:OAuth20Service = service;
    protected var token:String = token;

    constructor(instance: DefaultApi20, scope: String, clientId: String, clientSecret: String, callback:String) {
        this.service = ServiceBuilder(clientId)
                .apiSecret(clientSecret)
                .callback(callback)
                .defaultScope(scope)
                .build(instance);
    }

    constructor(token: String, instance: DefaultApi20, scope: String, clientId: String, clientSecret: String, callback: String){
        this.token=token
        this.service = ServiceBuilder(clientId)
                .apiSecret(clientSecret)
                .callback(callback)
                .defaultScope(scope)
                .build(instance)
    }

    private fun executeRequest(verb: Verb, url: String): Response {
        var accessToken: OAuth2AccessToken  = service.refreshAccessToken(this.token);
        var request:OAuthRequest = OAuthRequest(Verb.GET, url);
        service.signRequest(accessToken, request);
        var response:Response = service.execute(request);
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