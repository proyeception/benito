package com.github.proyeception.benito.controller;

import com.github.proyeception.benito.dto.*
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

    @RequestMapping("/benito/stats/projectsxcategory", method = [RequestMethod.GET])
    @ResponseBody
    private fun projectsXcategoryWorganization(
        @RequestParam(required = false) organizationId: String?
    ): List<CategoryQuantityDTO> = statsService.projectsXcategory(organizationId)

    @RequestMapping("/benito/stats/projectsxcategoryxyear", method = [RequestMethod.GET])
    @ResponseBody
    private fun projectsXyearWcategory(
        @RequestParam(required = false) categoryIds: List<String>?
    ): List<ProjectCreationTimelineDTO> = statsService.projectsXyearWcategory(categoryIds)

    @RequestMapping("/benito/stats/topprojects", method = [RequestMethod.GET])
    @ResponseBody
    private fun topProjects(
        @RequestParam(required = false) categoryId: String?,
        @RequestParam(required = false) organizationId: String?,
        @RequestParam(required = false) year: Int?
    ): List<ProjectInfoDTO> = statsService.topprojects(categoryId, organizationId, year)
}