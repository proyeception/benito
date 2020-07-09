package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MangoClient
import com.github.proyeception.benito.dto.ProjectDTO

open class ProjectService(
    private val mangoClient: MangoClient
) {
    fun findProjects(): List<ProjectDTO> {
        return mangoClient.getProjects()
    }
}