package com.github.proyeception.benito.controller;

import com.github.proyeception.benito.dto.OrganizationQuantityDTO
import com.github.proyeception.benito.dto.ProjectCreationTimelineDTO
import com.github.proyeception.benito.dto.ProjectVisitDTO
import com.github.proyeception.benito.service.*
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*


@Controller
class StatsController (
    private val statsService: StatsService
) {
    //TODO delete
    @RequestMapping("/benito/stats/findall", method = [RequestMethod.GET])
    @ResponseBody
    private fun allVisits(): List<ProjectVisitDTO> = statsService.findAll()

    @RequestMapping("/benito/stats/projectsxorganization", method = [RequestMethod.GET])
    @ResponseBody
    private fun projectsXorganizationWcategory(
        @RequestParam(required = false) categoryId: String?
    ): List<OrganizationQuantityDTO> = statsService.projectsXorganization(categoryId)

    @RequestMapping("/benito/stats/projectsxcategoryxyear", method = [RequestMethod.GET])
    @ResponseBody
    private fun projectsXyearWcategory(
        @RequestParam(required = false) categoryIds: List<String>?
    ): List<ProjectCreationTimelineDTO> = statsService.projectsXyearWcategory(categoryIds)
}