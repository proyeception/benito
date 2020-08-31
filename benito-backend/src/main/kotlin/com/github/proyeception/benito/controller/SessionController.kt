package com.github.proyeception.benito.controller

import com.github.proyeception.benito.dto.SessionInfoDTO
import com.github.proyeception.benito.exception.UnauthorizedException
import com.github.proyeception.benito.service.SessionService
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@Controller
class SessionController(
    private val sessionService: SessionService
) {
    @RequestMapping(value = ["/benito/user"], method = [RequestMethod.GET])
    @ResponseBody
    @CrossOrigin
    fun sessionInfo(
        @RequestHeader("x-qui-token") userInfo: String
    ): SessionInfoDTO = sessionService.get(userInfo) ?: throw UnauthorizedException("Unauthorized user")
}