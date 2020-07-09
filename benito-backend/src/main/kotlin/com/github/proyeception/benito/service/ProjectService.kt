
package com.github.proyeception.benito.service

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.dto.ProjectDTO
import com.github.proyeception.benito.exception.NotFoundException

open class ProjectService(
        private val mangoConnector: Connector
) {
    fun findProjects(): List<ProjectDTO> {
        val response = mangoConnector.get("/projects")
        return if (response.isError()) {
            throw NotFoundException("Error while finding all projects")
        } else {
            response.deserializeAs(object : TypeReference<List<ProjectDTO>>() {})
        }
    }
} 