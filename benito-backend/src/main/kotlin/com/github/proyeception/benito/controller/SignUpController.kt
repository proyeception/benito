package com.github.proyeception.benito.controller

import com.github.proyeception.benito.X_QUI_TOKEN
import com.github.proyeception.benito.dto.AuthorSignUpDTO
import com.github.proyeception.benito.dto.CreatePendingSupervisorDTO
import com.github.proyeception.benito.service.AuthenticationService
import com.github.proyeception.benito.service.SignUpService
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseStatus
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletResponse

@Controller
class SignUpController(
    private val signUpService: SignUpService,
    private val authenticationService: AuthenticationService
) {
    @RequestMapping(value = ["/benito/supervisors/sign-up"], method = [RequestMethod.POST])
    @ResponseStatus(value = HttpStatus.OK)
    fun requestSupervisorAccount(
        @RequestBody supervisor: CreatePendingSupervisorDTO
    ): Unit = signUpService.createPendingSupervisor(supervisor)

    @RequestMapping(value = ["/benito/authors/sign-up"], method = [RequestMethod.POST])
    @ResponseStatus(value = HttpStatus.OK)
    fun signUpAuthor(
        @RequestBody author: AuthorSignUpDTO,
        response: HttpServletResponse
    ) {
        signUpService.createAuthor(author)
        val token = authenticationService.authenticateAuthor(author.mail, author.token)
        response.addCookie(Cookie(X_QUI_TOKEN, token).also { it.path = "/" })
    }
}