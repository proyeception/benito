package com.github.proyeception.benito.controller

import com.github.proyeception.benito.oauth.GoogleAccountClient
import com.github.proyeception.benito.oauth.GoogleDriveClient
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.view.RedirectView
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletResponse

@Controller
open class OAuthController(
    private val client: GoogleAccountClient,
    @Qualifier("onAuthorizeRedirect") private val onAuthorizeRedirect: String
) {

    @RequestMapping(method = [RequestMethod.GET], value = ["/benito/callback"])
    open fun authorizationCallback(
        @RequestParam("code") code: String,
        @RequestParam("state") secret: String,
        response: HttpServletResponse
    ): RedirectView {
        var token = client.finishNewAuth(code)
        response.addCookie(Cookie("una-re-cookie", "tu-hermana"))
        return RedirectView("http://localhost:8080")
    }

    @RequestMapping(method = [RequestMethod.GET], value = ["/benito/auth"])
    @ResponseBody
    @CrossOrigin
    open fun authorization(): String = client.initNewAuth()
}