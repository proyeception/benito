package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.DownloadableFile
import com.github.proyeception.benito.dto.CountDTO
import com.github.proyeception.benito.dto.OrderDTO
import com.github.proyeception.benito.dto.ProjectDTO
import org.springframework.core.io.ByteArrayResource
import java.io.File

open class ProjectService(
    private val medusaClient: MedusaClient
) {
    open fun findProjects(
        orderBy: OrderDTO?,
        from: String?,
        to: String?,
        nameContains: String?,
        category: String?
    ): List<ProjectDTO> = medusaClient.getProjects(
        orderBy = orderBy,
        from = from,
        to = to,
        nameContains = nameContains,
        category = category
    ).map { ProjectDTO(it) }

    fun top10Projects(): List<ProjectDTO> = medusaClient.top10Projects().map { ProjectDTO(it) }

    fun count(): CountDTO = CountDTO(medusaClient.projectCount())

    fun findProject(id: String): ProjectDTO {
        return ProjectDTO(medusaClient.project(id))
    }

    fun findDocument(id: String): DownloadableFile {
        //TODO: use google api to download documents

        val classLoader = javaClass.classLoader
        if(id.equals("1")) {
            val file = File(classLoader.getResource("documentation/A2.xlsx").file)
            return DownloadableFile("holi.xlsx", ByteArrayResource(file.readBytes()))
        }
        val file = File(classLoader.getResource("documentation/costos.docx").file)
        return DownloadableFile("holi.doc", ByteArrayResource(file.readBytes()))
    }
}