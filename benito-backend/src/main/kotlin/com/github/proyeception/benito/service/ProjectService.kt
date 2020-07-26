package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.ProjectDTO

open class ProjectService(
    private val medusaClient: MedusaClient
) {
    fun findProjects(): List<ProjectDTO> {
        return medusaClient.projects().map { ProjectDTO(it) }
    }
}