package com.github.proyeception.benito.controller

import com.github.proyeception.benito.oauth.GoogleDriveOAuthClient
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseStatus

@Controller
open class OAuthController(
    private val client: GoogleDriveOAuthClient
) {

    @RequestMapping(method = [RequestMethod.GET], value = ["/benito/callback"])
    open fun authorizationCallback(
        @RequestParam("code") code: String,
        @RequestParam("secret") secret: String
    ) {
        var token = client.finishNewAuth(code)
    }

    @RequestMapping(method = [RequestMethod.GET], value = ["/benito/auth"])
    @ResponseStatus(HttpStatus.MULTIPLE_CHOICES)
    open fun authorization(): String = client.initNewAuth()
}