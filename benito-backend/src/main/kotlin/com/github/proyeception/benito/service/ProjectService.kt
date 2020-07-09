
package com.github.proyeception.benito.service

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.client.MangoClient
import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.dto.ProjectDTO
import com.github.proyeception.benito.exception.NotFoundException

open class ProjectService(
        private val mangoClient: MangoClient
) {
    fun findProjects(): List<ProjectDTO> {
        return mangoClient.getProjects()
    }
} 