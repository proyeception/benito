package com.github.proyeception.benito.controller

import com.github.proyeception.benito.dto.LoginRequestDTO
import com.github.proyeception.benito.dto.UserSessionDTO
import com.github.proyeception.benito.service.SessionService
import com.github.proyeception.benito.service.UserService
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.ResponseBody

@Controller
class LoginController(
    private val userService: UserService,
    private val sessionService: SessionService
) {
    @PostMapping("/login")
    @ResponseBody
    fun login(@RequestBody loginRequest: LoginRequestDTO): UserSessionDTO {
        val userInfo = userService.findUser(
            username = loginRequest.username,
            password = loginRequest.password,
            userTypeDTO = loginRequest.userType
        )

        val sessionToken = sessionService.createSessionToken(userInfo.id)

        return UserSessionDTO(
            sessionToken = sessionToken,
            userInfo = userInfo
        )
    }
}