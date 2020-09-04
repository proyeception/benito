package com.github.proyeception.benito.controller

import com.github.proyeception.benito.service.SessionService
import com.github.proyeception.benito.service.UserService
import org.springframework.http.HttpStatus
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
    @CrossOrigin
    fun findAuthor(@PathVariable id: String) = userService.findAuthor(id)

    @RequestMapping(value = ["/benito/supervisors/{id}"], method = [RequestMethod.GET])
    @ResponseBody
    @CrossOrigin
    fun findSupervisor(@PathVariable id: String) = userService.findSupervisor(id)

    @RequestMapping(
        value = ["/benito/authors/{id}/picture"],
        method = [RequestMethod.POST], // should be a PUT, but it seems PUT doesn't work with multipart
        consumes = [MediaType.MULTIPART_FORM_DATA_VALUE]
    )
    @CrossOrigin
    @ResponseStatus(value = HttpStatus.OK)
    fun updateAuthorProfilePicture(
        @PathVariable id: String,
        @RequestParam("file") image: MultipartFile,
        @RequestHeader(value = "x-qui-token", required = true) token: String
    ) = doAuthorized(id, token) { userService.updateAuthorProfilePicture(id, image) }

    @RequestMapping(
        value = ["/benito/supervisors/{id}/picture"],
        method = [RequestMethod.POST], // should be a PUT, but it seems PUT doesn't work with multipart
        consumes = [MediaType.MULTIPART_FORM_DATA_VALUE]
    )
    @CrossOrigin
    @ResponseStatus(value = HttpStatus.OK)
    fun updateSupervisorProfilePicture(
        @PathVariable id: String,
        @RequestParam("file") image: MultipartFile,
        @RequestHeader(value = "x-qui-token", required = true) token: String
    ) = doAuthorized(id, token) { userService.updateSupervisorProfilePicture(id, image) }

    private fun doAuthorized(authorId: String, token: String, f: (String) -> Unit) = sessionService[token]
        ?.userId
        ?.takeIf { it == authorId }
        ?.let(f)
        ?: throw ForbiddenException("You're not allowed to edit this author")
}