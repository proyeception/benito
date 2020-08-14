package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.OrderDTO
import com.github.proyeception.benito.dto.ProjectDTO
import org.springframework.web.multipart.MultipartFile

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

    fun findProject(id: String): ProjectDTO {
        return ProjectDTO(medusaClient.project(id))
    }

    fun saveFile(projectId: String, file: MultipartFile) {
        medusaClient.saveFile(projectId, file)
        saveFileToGoogleDrive(projectId, file)
    }

    private fun saveFileToGoogleDrive(projectId: String, file: Any) {
        //TODO
    }
}