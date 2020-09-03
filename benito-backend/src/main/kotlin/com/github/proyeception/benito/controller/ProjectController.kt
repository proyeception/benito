package com.github.proyeception.benito.controller

import com.github.proyeception.benito.dto.CountDTO
import com.github.proyeception.benito.dto.OrderDTO
import com.github.proyeception.benito.dto.ProjectDTO
import com.github.proyeception.benito.dto.UpdateProjectDTO
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
    @ResponseBody
    @CrossOrigin
    @ResponseStatus(value = HttpStatus.OK)
    private fun saveFile(
        @PathVariable projectId: String,
        @RequestParam name: String,
        @RequestParam("file") file: MultipartFile
    ): Unit = projectService.saveFile(projectId, name, file)

    @RequestMapping(value = ["/benito/projects/:id"], method = [RequestMethod.PATCH])
    @CrossOrigin
    @ResponseStatus(value = HttpStatus.OK)
    fun updateProject(
        @PathVariable id: String,
        @RequestBody u: UpdateProjectDTO,
        @RequestHeader(value = "x-qui-token", required = true) token: String
    ) = sessionService[token]
        ?.userId
        ?.takeIf { projectService.hasAuthor(authorId = it, projectId = id) }
        ?.let { projectService.updateProject(u, id) }
        ?: throw ForbiddenException("You're not allowed to edit this project")
}
