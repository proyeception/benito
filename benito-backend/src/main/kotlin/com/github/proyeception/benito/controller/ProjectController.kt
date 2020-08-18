package com.github.proyeception.benito.controller

import com.github.proyeception.benito.dto.CountDTO
import com.github.proyeception.benito.dto.OrderDTO
import com.github.proyeception.benito.dto.ProjectDTO
import com.github.proyeception.benito.service.ProjectService
import org.springframework.stereotype.Controller
import org.springframework.util.LinkedMultiValueMap
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
        @RequestParam(required = false, name = "category") category: String?
    ): List<ProjectDTO> {
        return projectService.findProjects(orderBy, from, to, nameContains, category)
    }

    @RequestMapping("/benito/projects/featured", method = [RequestMethod.GET])
    @ResponseBody
    @CrossOrigin
    private fun top10Projects(): List<ProjectDTO> {
        return projectService.top10Projects()
    }

    @RequestMapping("/benito/project-count", method = [RequestMethod.GET])
    @ResponseBody
    @CrossOrigin
    private fun count(): CountDTO = projectService.count()

    @RequestMapping("/benito/projects/{id}", method = [RequestMethod.GET])
    @ResponseBody
    @CrossOrigin
    private fun findProjects(@PathVariable id: String): ProjectDTO {
        return projectService.findProject(id)
    }


    @RequestMapping("/benito/documentation/{id}", method = [RequestMethod.GET], produces = ["multipart/form-data"])
    @ResponseBody
    @CrossOrigin
    private fun downloadDocument(@PathVariable id: String): LinkedMultiValueMap<String, Any> {
        val downloadableDocument = projectService.findDocument(id)

        val body: LinkedMultiValueMap<String, Any> = LinkedMultiValueMap<String, Any>()
        body.add("file", downloadableDocument.file)
        body.add("fileName", downloadableDocument.fileName)

        return body
    }

}

}

