package com.github.proyeception.benito.controller

import com.github.proyeception.benito.oauth.GoogleDriveOAuthClient
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam

@Controller
open class OAuthController{

    @RequestMapping(method= [RequestMethod.GET], value=["/benito/callback"])
    open fun authorizationCallback(@RequestParam("code") code:String, @RequestParam("secret") secret:String): Unit {
        var client: GoogleDriveOAuthClient = GoogleDriveOAuthClient()
        var token = client.finishNewAuth(code)
    }

    @RequestMapping(method= [RequestMethod.GET], value=["/benito/auth"])
    open fun authorization(): ResponseEntity<String> {
        var client: GoogleDriveOAuthClient = GoogleDriveOAuthClient()
        var url = client.initNewAuth()
        return ResponseEntity.status(300).body(url)
    }

    @RequestMapping(method= [RequestMethod.GET], value=["/benito/file/{fileId}"])
    open fun getFile(@PathVariable("fileId") id:String): ResponseEntity<String> {
        var client: GoogleDriveOAuthClient = GoogleDriveOAuthClient()
        return ResponseEntity.status(300).body(client.getFile(id))
    }
}