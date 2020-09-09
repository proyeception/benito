package com.github.proyeception.benito.controller

import com.github.proyeception.benito.dto.OrganizationDTO
import com.github.proyeception.benito.service.OrganizationService
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@Controller
class OrganizationController(
    private val organizationService: OrganizationService
) {
    @RequestMapping(value = ["/benito/organizations/{id}"], method = [RequestMethod.GET])
    @ResponseBody
    @CrossOrigin
    fun organization(
        @PathVariable id: String,
        @RequestParam(required = false, defaultValue = "true") cached: Boolean
    ): OrganizationDTO = organizationService.find(id = id, cached = cached)

    @RequestMapping(value = ["/benito/organizations"], method = [RequestMethod.GET])
    @ResponseBody
    @CrossOrigin
    fun organizations(
        @RequestParam(required = false, defaultValue = "true") cached: Boolean
    ): List<OrganizationDTO> = organizationService.findAll(cached)
}