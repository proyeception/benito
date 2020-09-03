package com.github.proyeception.benito.controller

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
    @CrossOrigin
    fun sessionInfo(
        @RequestHeader("x-qui-token") token: String
    ): SessionInfoDTO = sessionService[token] ?: throw UnauthorizedException("Unauthorized user")

    @RequestMapping(value = ["/benito/session"], method = [RequestMethod.DELETE])
    @CrossOrigin
    @ResponseStatus(HttpStatus.OK)
    fun deleteSession(
        @RequestHeader("x-qui-token") token: String
    ) = sessionService.delete(token)
}