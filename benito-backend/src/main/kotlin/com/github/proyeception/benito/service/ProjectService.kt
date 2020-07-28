package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.OrderDTO
import com.github.proyeception.benito.dto.ProjectDTO

open class ProjectService(
    private val medusaClient: MedusaClient
) {
    open fun findProjects(orderBy: OrderDTO?): List<ProjectDTO> {
        return medusaClient.projects(orderBy).map { ProjectDTO(it) }
    }
}