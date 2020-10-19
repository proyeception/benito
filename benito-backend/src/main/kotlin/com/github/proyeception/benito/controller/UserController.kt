package com.github.proyeception.benito.controller

import com.github.proyeception.benito.X_QUI_TOKEN
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.exception.UnauthorizedException
import com.github.proyeception.benito.service.RecommendationService
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
    private val sessionService: SessionService,
    private val recommendationService: RecommendationService
) {

    @RequestMapping(value = ["/benito/authors/{id}"], method = [RequestMethod.GET])
    @ResponseBody
    fun findAuthor(@PathVariable id: String) = userService.findAuthor(id)

    @RequestMapping(value = ["/benito/supervisors/{id}"], method = [RequestMethod.GET])
    @ResponseBody
    fun findSupervisor(@PathVariable id: String) = recommendationService.getAuthorRecommendations(id, UserType.SUPERVISOR)

    @RequestMapping(value = ["/benito/authors/{id}/recommendations"], method = [RequestMethod.GET])
    @ResponseBody
    fun getAuthorRecommendations(@PathVariable id: String) = recommendationService.getAuthorRecommendations(id, UserType.AUTHOR)

    @RequestMapping(value = ["/benito/supervisor/{id}/recommendations"], method = [RequestMethod.GET])
    @ResponseBody
    fun getSupervisorRecommendations(@PathVariable id: String) = recommendationService.getSupervisorRecommendations(id)

    @RequestMapping(value = ["/benito/authors"], method = [RequestMethod.POST])
    @ResponseBody
    fun createGhostAuthor(
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String,
        @RequestBody ghost: CreateGhostUserDTO
    ): PersonDTO = doSupervisorAuthorized(token) { userService.createGhostAuthor(ghost) }

    @RequestMapping(value = ["/benito/supervisors"], method = [RequestMethod.POST])
    @ResponseBody
    fun createGhostSupervisor(
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String,
        @RequestBody ghost: CreateGhostUserDTO
    ): PersonDTO = doSupervisorAuthorized(token) { userService.createGhostSupervisor(ghost) }

    @RequestMapping(value = ["/benito/author/{userId}/viewedProjects/{projectId}"], method = [RequestMethod.POST])
    @ResponseBody
    fun viewProject(
            @PathVariable userId: String,
            @PathVariable projectId: String
    ) { userService.viewProject(userId, projectId) }

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

    @RequestMapping(
        value = ["/benito/authors/{authorId}/organizations/{organizationId}"],
        method = [RequestMethod.DELETE]
    )
    @ResponseBody
    fun authorLeaveOrganization(
        @PathVariable authorId: String,
        @PathVariable organizationId: String,
        @RequestHeader(X_QUI_TOKEN, required = true) token: String
    ): PersonDTO = doAuthorized(authorId, token) { userService.authorLeaveOrganization(authorId, organizationId) }

    @RequestMapping(
        value = ["/benito/supervisors/{supervisorId}/organizations/{organizationId}"],
        method = [RequestMethod.DELETE]
    )
    @ResponseBody
    fun supervisorLeaveOrganization(
        @PathVariable supervisorId: String,
        @PathVariable organizationId: String,
        @RequestHeader(X_QUI_TOKEN, required = true) token: String
    ): PersonDTO = doAuthorized(supervisorId, token) { userService.supervisorLeaveOrganization(supervisorId, organizationId) }

    private fun <T> doSupervisorAuthorized(token: String, f: () -> T): T {
        val session = sessionService[token]
            ?: throw UnauthorizedException("I don't know who you are")

        return session.takeIf { it.role == RoleDTO.SUPERVISOR }
            ?.let { f() }
            ?: throw ForbiddenException("You're not allowed to edit this user")
    }

    private fun <T> doAuthorized(userId: String, token: String, f: (String) -> T): T {
        val session = sessionService[token]
            ?: throw UnauthorizedException("I don't know who you are")

        return session.userId.takeIf { it == userId }
            ?.let(f)
            ?: throw ForbiddenException("You're not allowed to edit this user")
    }
}