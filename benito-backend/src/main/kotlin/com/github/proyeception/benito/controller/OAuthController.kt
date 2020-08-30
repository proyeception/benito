package com.github.proyeception.benito.controller

import com.github.proyeception.benito.oauth.GoogleAccountClient
import com.github.proyeception.benito.service.AuthorizationService
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.view.RedirectView
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletResponse

@Controller
open class OAuthController(
    private val client: GoogleAccountClient,
    @Qualifier("onAuthorizeRedirect") private val onAuthorizeRedirect: String,
    private val authorizationService: AuthorizationService
) {

    @RequestMapping(method = [RequestMethod.GET], value = ["/benito/callback"])
    open fun authorizationCallback(
        @RequestParam("code") code: String,
        @RequestParam("state") secret: String,
        response: HttpServletResponse
    ): RedirectView {
        val cookie = authorizationService.finishAuth(code, secret)
        response.addCookie(Cookie("x-qui-token", cookie))
        return RedirectView(onAuthorizeRedirect)
    }

    @RequestMapping(method = [RequestMethod.GET], value = ["/benito/auth"])
    @ResponseBody
    @CrossOrigin
    open fun authorization(): String = authorizationService.initAuth()
}