package com.github.proyeception.benito.controller

import com.github.proyeception.benito.X_QUI_TOKEN
import com.github.proyeception.benito.dto.PersonDTO
import com.github.proyeception.benito.dto.UpdateUserDTO
import com.github.proyeception.benito.exception.UnauthorizedException
import com.github.proyeception.benito.service.SessionService
import com.github.proyeception.benito.service.UserService
import org.springframework.http.MediaType
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import javax.ws.rs.ForbiddenException

@Controller
class UserController(
    private val userService: UserService,
    private val sessionService: SessionService
) {
    @RequestMapping(value = ["/benito/authors/{id}"], method = [RequestMethod.GET])
    @ResponseBody
    fun findAuthor(@PathVariable id: String) = userService.findAuthor(id)

    @RequestMapping(value = ["/benito/supervisors/{id}"], method = [RequestMethod.GET])
    @ResponseBody
    fun findSupervisor(@PathVariable id: String) = userService.findSupervisor(id)

    @RequestMapping(
        value = ["/benito/authors/{id}/picture"],
        method = [RequestMethod.POST], // should be a PUT, but it seems PUT doesn't work with multipart
        consumes = [MediaType.MULTIPART_FORM_DATA_VALUE]
    )
    @ResponseBody
    fun updateAuthorProfilePicture(
        @PathVariable id: String,
        @RequestParam("file") image: MultipartFile,
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String
    ): PersonDTO = doAuthorized(id, token) { userService.updateAuthorProfilePicture(id, image) }

    @RequestMapping(
        value = ["/benito/supervisors/{id}/picture"],
        method = [RequestMethod.POST], // should be a PUT, but it seems PUT doesn't work with multipart
        consumes = [MediaType.MULTIPART_FORM_DATA_VALUE]
    )
    @ResponseBody
    fun updateSupervisorProfilePicture(
        @PathVariable id: String,
        @RequestParam("file") image: MultipartFile,
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String
    ): PersonDTO = doAuthorized(id, token) { userService.updateSupervisorProfilePicture(id, image) }

    @RequestMapping(value = ["/benito/authors/{id}"], method = [RequestMethod.PATCH])
    @ResponseBody
    fun updateAuthor(
        @PathVariable id: String,
        @RequestBody user: UpdateUserDTO,
        @RequestHeader(X_QUI_TOKEN, required = true) token: String
    ): PersonDTO = doAuthorized(id, token) { userService.updateAuthor(id, user) }

    @RequestMapping(value = ["/benito/supervisors/{id}"], method = [RequestMethod.PATCH])
    @ResponseBody
    fun updateSupervisor(
        @PathVariable id: String,
        @RequestBody user: UpdateUserDTO,
        @RequestHeader(X_QUI_TOKEN, required = true) token: String
    ): PersonDTO = doAuthorized(id, token) { userService.updateSupervisor(id, user) }

    private fun <T> doAuthorized(authorId: String, token: String, f: (String) -> T): T {
        val session = sessionService[token]
            ?: throw UnauthorizedException("I don't know who you are")

        return session.userId.takeIf { it == authorId }
            ?.let(f)
            ?: throw ForbiddenException("You're not allowed to edit this user")
    }
}