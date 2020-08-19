package com.github.proyeception.benito.controller

import com.github.proyeception.benito.oauth.GoogleDriveOAuthClient
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam

@Controller
open class OAuthController(private val client: GoogleDriveOAuthClient){

    @RequestMapping(method= [RequestMethod.GET], value=["/benito/callback"])
    open fun authorizationCallback(@RequestParam("code") code:String, @RequestParam("secret") secret:String): Unit {
        var token = client.finishNewAuth(code)
    }

    @RequestMapping(method= [RequestMethod.GET], value=["/benito/auth"])
    open fun authorization(): ResponseEntity<String> {
        val url = client.initNewAuth()
        return ResponseEntity.status(300).body(url)
    }

}