package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.storage.StatsStorage

open class StatsService(
    private val statsStorage: StatsStorage,
    private val medusaClient: MedusaClient
) {

    fun findAll(): List<ProjectVisitDTO> = statsStorage
        .findAll()

    fun registerVisit(projectVisitDTO: ProjectVisitDTO) = statsStorage.insert(projectVisitDTO)

    fun projectsXorganization(categoryId: String?): List<OrganizationQuantityDTO> {
        val projects = medusaClient.findProjects()
        val result = projects.filter{it.category.id == categoryId || categoryId.isNullOrBlank()}
                    .groupingBy { it.organization.displayName }
                    .eachCount()
                    .map{OrganizationQuantityDTO(it.key, it.value)}
        return result
    }
}
