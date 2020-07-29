package com.github.proyeception.benito.controller

import com.github.proyeception.benito.dto.ProjectDTO
import com.github.proyeception.benito.service.ProjectService
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@Controller
class ProjectController(
    private val projectService: ProjectService
) {

    @RequestMapping("/benito/projects", method = [RequestMethod.GET])
    @ResponseBody
    @CrossOrigin
    private fun findProjects(): List<ProjectDTO> {
        return projectService.findProjects()
    }

    @RequestMapping("/benito/projects/{id}", method = [RequestMethod.GET])
    @ResponseBody
    @CrossOrigin
    private fun findProjects(@PathVariable id: String): ProjectDTO {
        return projectService.findProject(id)
    }
}