package com.github.proyeception.benito.controller

import com.github.proyeception.benito.dto.OrderDTO
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
    private fun findProjects(
            @RequestParam(required = false) orderBy: OrderDTO?,
            @RequestParam(required = false) from: String?,
            @RequestParam(required = false) to: String?,
            @RequestParam(required = false, name = "name") nameContains: String?,
            @RequestParam(required = false, name = "tags") tags: String?
    ): List<ProjectDTO> {
        return projectService.findProjects(orderBy, from, to, nameContains, tags)
    }

    @RequestMapping("/benito/projects/top-10", method = [RequestMethod.GET])
    @ResponseBody
    @CrossOrigin
    private fun top10Projects(): List<ProjectDTO> {
        return projectService.top10Projects()
    }
}