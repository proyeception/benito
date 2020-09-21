package com.github.proyeception.benito.controller

import com.github.proyeception.benito.X_QUI_TOKEN
import com.github.proyeception.benito.dto.SessionInfoDTO
import com.github.proyeception.benito.exception.UnauthorizedException
import com.github.proyeception.benito.service.SessionService
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@Controller
class SessionController(
    private val sessionService: SessionService
) {
    @RequestMapping(value = ["/benito/session"], method = [RequestMethod.GET])
    @ResponseBody
    fun sessionInfo(
        @RequestHeader(X_QUI_TOKEN) token: String
    ): SessionInfoDTO = sessionService[token] ?: throw UnauthorizedException("Unauthorized user")

    @RequestMapping(value = ["/benito/session"], method = [RequestMethod.DELETE])
    @ResponseStatus(HttpStatus.OK)
    fun deleteSession(
        @RequestHeader(X_QUI_TOKEN) token: String
    ) = sessionService.delete(token)
}