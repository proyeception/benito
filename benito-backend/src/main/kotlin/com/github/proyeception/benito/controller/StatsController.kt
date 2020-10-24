package com.github.proyeception.benito.controller;

import com.github.proyeception.benito.dto.ProjectVisitDTO
import com.github.proyeception.benito.service.*
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
class StatsController (
    private val statsService: StatsService
) {
    //TODO delete
    @RequestMapping("/benito/stats/findall", method = [RequestMethod.GET])
    @ResponseBody
    private fun allVisits(): List<ProjectVisitDTO> = statsService.findAll()

    //TODO delete
    @RequestMapping("/benito/stats/insert", method = [RequestMethod.POST])
    @ResponseBody
    private fun insertVisit(@RequestBody visit: ProjectVisitDTO) = statsService.insert(visit)
}