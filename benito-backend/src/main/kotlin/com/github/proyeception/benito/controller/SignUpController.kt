package com.github.proyeception.benito.controller

import com.github.proyeception.benito.dto.CreatePendingSupervisorDTO
import com.github.proyeception.benito.service.SignUpService
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseStatus

@Controller
class SignUpController(
    private val signUpService: SignUpService
) {
    @RequestMapping(value = ["/benito/supervisors/sign-up"], method = [RequestMethod.POST])
    @ResponseStatus(value = HttpStatus.OK)
    fun requestSupervisorAccount(
        @RequestBody supervisor: CreatePendingSupervisorDTO
    ): Unit = signUpService.createPendingSupervisor(
        supervisor
    )
}