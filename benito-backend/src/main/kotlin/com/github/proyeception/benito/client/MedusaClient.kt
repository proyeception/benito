package com.github.proyeception.benito.client

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.dto.MedusaProjectDTO
import com.github.proyeception.benito.exception.FailedDependencyException
import org.slf4j.LoggerFactory

open class MedusaClient(
    private val medusaConnector: Connector
) {
    open fun projects(): List<MedusaProjectDTO> {
        val response = medusaConnector.get("/projects")
        LOGGER.info(response.body)

        if (response.isError()) {
            throw FailedDependencyException("Error getting projects from Medusa")
        }

        return response.deserializeAs(object : TypeReference<List<MedusaProjectDTO>>() {})
    }

    open fun project(id: String): MedusaProjectDTO {
        val response = medusaConnector.get("/projects/${id}")
        LOGGER.info(response.body)

        if (response.isError()) {
            throw FailedDependencyException("Error getting project from Medusa")
        }

        return response.deserializeAs(object : TypeReference<MedusaProjectDTO>() {})
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(MedusaClient::class.java)
    }
}