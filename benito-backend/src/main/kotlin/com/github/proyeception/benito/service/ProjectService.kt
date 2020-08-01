package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.OrderDTO
import com.github.proyeception.benito.dto.ProjectDTO

open class ProjectService(
    private val medusaClient: MedusaClient
) {
    open fun findProjects(
        orderBy: OrderDTO?,
        from: String?,
        to: String?,
        nameContains: String?,
        tags: String?
    ): List<ProjectDTO> {
        return medusaClient.getProjects(orderBy, from, to, nameContains, tags).map { ProjectDTO(it) }
    }

    fun top10Projects(): List<ProjectDTO> {
        return medusaClient.top10Projects().map { ProjectDTO(it) }
    }
}