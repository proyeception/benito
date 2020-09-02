package com.github.proyeception.benito.controller

import com.github.proyeception.benito.dto.LoginDTO
import com.github.proyeception.benito.service.AuthenticationService
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletResponse

@Controller
open class LoginController(
    @Qualifier("onAuthorizeRedirect") private val onAuthorizeRedirect: String,
    private val authenticationService: AuthenticationService
) {
    @RequestMapping(value = ["/benito/login"], method = [RequestMethod.POST])
    @ResponseStatus(HttpStatus.OK)
    @CrossOrigin(origins = ["http://localhost:8080"], allowCredentials = "true")
    open fun login(@RequestBody login: LoginDTO, response: HttpServletResponse) {
        val token = authenticationService.authenticate(login)
        response.addHeader("x-qui-token", token)
        response.addCookie(Cookie("x-qui-token", token).also { it.path = "/" })
    }
}