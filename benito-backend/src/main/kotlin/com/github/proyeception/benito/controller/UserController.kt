package com.github.proyeception.benito.controller

import com.github.proyeception.benito.service.UserService
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@Controller
class UserController(
    private val userService: UserService
) {
    @RequestMapping(value = ["/benito/authors/{id}"], method = [RequestMethod.GET])
    @ResponseBody
    @CrossOrigin
    fun findAuthor(@PathVariable id: String) = userService.findAuthor(id)

    @RequestMapping(value = ["/benito/supervisors/{id}"], method = [RequestMethod.GET])
    @ResponseBody
    @CrossOrigin
    fun findSupervisor(@PathVariable id: String) = userService.findSupervisor(id)
}