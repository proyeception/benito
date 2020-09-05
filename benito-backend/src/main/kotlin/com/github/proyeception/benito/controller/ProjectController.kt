package com.github.proyeception.benito.controller

import com.github.proyeception.benito.X_QUI_TOKEN
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.exception.ForbiddenException
import com.github.proyeception.benito.service.ProjectService
import com.github.proyeception.benito.service.SessionService
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile


@Controller
class ProjectController(
    private val projectService: ProjectService,
    private val sessionService: SessionService
) {

    @RequestMapping("/benito/projects", method = [RequestMethod.GET])
    @ResponseBody
    @CrossOrigin
    private fun findProject(
        @RequestParam(required = false) orderBy: OrderDTO?,
        @RequestParam(required = false) from: String?,
        @RequestParam(required = false) to: String?,
        @RequestParam(required = false, name = "name") nameContains: String?,
        @RequestParam(required = false, name = "category") category: String?
    ): List<ProjectDTO> = projectService.findProjects(orderBy, from, to, nameContains, category)

    @RequestMapping("/benito/projects/featured", method = [RequestMethod.GET])
    @ResponseBody
    @CrossOrigin
    private fun featuredProjects(): List<ProjectDTO> = projectService.featuredProjects()

    @RequestMapping("/benito/project-count", method = [RequestMethod.GET])
    @ResponseBody
    @CrossOrigin
    private fun count(): CountDTO = projectService.count()

    @RequestMapping("/benito/projects/{id}", method = [RequestMethod.GET])
    @ResponseBody
    @CrossOrigin
    private fun findProject(@PathVariable id: String): ProjectDTO = projectService.findProject(id)

    @RequestMapping(
        value = ["/benito/projects/{projectId}/documents"],
        method = [RequestMethod.POST],
        consumes = [MediaType.MULTIPART_FORM_DATA_VALUE]
    )
    @CrossOrigin
    @ResponseStatus(value = HttpStatus.OK)
    private fun saveFile(
        @PathVariable projectId: String,
        @RequestParam name: String,
        @RequestParam("file") file: MultipartFile
    ): Unit = projectService.saveDocument(projectId, name, file)

    @RequestMapping(value = ["/benito/projects/{id}/content"], method = [RequestMethod.PATCH])
    @CrossOrigin
    @ResponseStatus(value = HttpStatus.OK)
    fun updateProjectContent(
        @PathVariable id: String,
        @RequestBody content: UpdateContentDTO,
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String
    ) = doAuthorAuthorized(id, token) { projectService.updateProjectContent(content, id) }

    @RequestMapping(
        value = ["/benito/projects/{id}/poster"],
        method = [RequestMethod.POST], // should be a PUT, but it seems PUT doesn't work with multipart
        consumes = [MediaType.MULTIPART_FORM_DATA_VALUE]
    )
    @CrossOrigin
    @ResponseStatus(value = HttpStatus.OK)
    fun updateProjectPoster(
        @PathVariable id: String,
        @RequestParam("file") image: MultipartFile,
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String
    ) = doAuthorAuthorized(projectId = id, token = token) { projectService.updateProjectImage(id, image) }

    @RequestMapping(value = ["/benito/projects/{projectId}/documents/{documentId}"], method = [RequestMethod.DELETE])
    @CrossOrigin
    @ResponseStatus(value = HttpStatus.OK)
    fun deleteDocument(
        @PathVariable projectId: String,
        @PathVariable documentId: String,
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String
    ) = doAuthorAuthorized(projectId = projectId, token = token) {
        projectService.deleteDocument(projectId, documentId)
    }

    @RequestMapping(value = ["/benito/projects/{projectId}/authors"], method = [RequestMethod.POST])
    @CrossOrigin
    @ResponseStatus(value = HttpStatus.OK)
    fun addAuthors(
        @PathVariable projectId: String,
        @RequestBody users: AddUsersDTO,
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String
    ) = doSupervisorAuthorized(projectId, token) { projectService.addAuthors(projectId, users) }

    @RequestMapping(value = ["/benito/projects/{projectId}/authors"], method = [RequestMethod.DELETE])
    @CrossOrigin
    @ResponseStatus(value = HttpStatus.OK)
    fun deleteAuthors(
        @PathVariable projectId: String,
        @RequestParam(value = "items", required = true) items: String,
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String
    ) = doSupervisorAuthorized(projectId, token) { projectService.deleteAuthors(projectId, items) }

    @RequestMapping(value = ["/benito/projects/{projectId}/supervisors"], method = [RequestMethod.DELETE])
    @CrossOrigin
    @ResponseStatus(value = HttpStatus.OK)
    fun addSupervisors(
        @PathVariable projectId: String,
        @RequestBody users: AddUsersDTO,
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String
    ) = doSupervisorAuthorized(projectId, token) { projectService.addSupervisors(projectId, users) }

    @RequestMapping(value = ["/benito/projects/{projectId}/supervisors"], method = [RequestMethod.DELETE])
    @CrossOrigin
    @ResponseStatus(value = HttpStatus.OK)
    fun deleteSupervisors(
        @PathVariable projectId: String,
        @RequestParam(value = "items", required = true) items: String,
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String
    ) = doSupervisorAuthorized(projectId, token) { projectService.deleteSupervisors(projectId, items) }

    private fun doSupervisorAuthorized(projectId: String, token: String, f: (String) -> Unit) = sessionService[token]
        ?.takeIf { it.role == RoleDTO.SUPERVISOR }
        ?.userId
        ?.takeIf { projectService.hasSupervisor(supervisorId = it, projectId = projectId) }
        ?.let(f)
        ?: throw ForbiddenException("You're not allowed to edit this project")

    private fun doAuthorAuthorized(projectId: String, token: String, f: (String) -> Unit) = sessionService[token]
        ?.takeIf { it.role == RoleDTO.AUTHOR }
        ?.userId
        ?.takeIf { projectService.hasAuthor(authorId = it, projectId = projectId) }
        ?.let(f)
        ?: throw ForbiddenException("You're not allowed to edit this project")
}
