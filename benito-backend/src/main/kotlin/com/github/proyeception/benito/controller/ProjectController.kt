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
    private fun findProjects(@RequestParam(required = false) orderBy: OrderDTO?): List<ProjectDTO> {
        return projectService.findProjects(orderBy)
    }
}