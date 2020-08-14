package com.github.proyeception.benito.controller

import com.github.proyeception.benito.dto.OrderDTO
import com.github.proyeception.benito.dto.ProjectDTO
import com.github.proyeception.benito.service.ProjectService
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile


@Controller
class ProjectController(
    private val projectService: ProjectService
) {

    @RequestMapping("/benito/projects", method = [RequestMethod.GET])
    @ResponseBody
    @CrossOrigin
    private fun findProjects(
        @RequestParam(required = false) orderBy: OrderDTO?,
        @RequestParam(required = false) from: String?,
        @RequestParam(required = false) to: String?,
        @RequestParam(required = false, name = "name") nameContains: String?,
        @RequestParam(required = false, name = "tags") tags: String?
    ): List<ProjectDTO> {
        return projectService.findProjects(orderBy, from, to, nameContains, tags)
    }

    @RequestMapping("/benito/projects/{id}", method = [RequestMethod.GET])
    @ResponseBody
    @CrossOrigin
    private fun findProjects(@PathVariable id: String): ProjectDTO {
        return projectService.findProject(id)
    }


    @RequestMapping("/benito/projects/{projectId}", method = [RequestMethod.POST], consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    @ResponseBody
    private fun saveFile(@PathVariable projectId: String,
                 @RequestParam("file") file: MultipartFile) : ResponseEntity<String> {
        projectService.saveFile(projectId, file)
        return ResponseEntity.ok("todo oki")
    }
}