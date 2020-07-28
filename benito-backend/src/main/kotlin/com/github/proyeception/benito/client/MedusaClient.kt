package com.github.proyeception.benito.client

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.dto.MedusaProjectDTO
import com.github.proyeception.benito.dto.OrderDTO
import com.github.proyeception.benito.exception.FailedDependencyException
import org.slf4j.LoggerFactory

open class MedusaClient(
    private val medusaConnector: Connector
) {
    open fun projects(orderBy: OrderDTO? = null): List<MedusaProjectDTO> {
        val endpoint = "/projects?".appendOrder(orderBy)

        val response = medusaConnector.get(endpoint)
        LOGGER.info(response.body)

        if (response.isError()) {
            throw FailedDependencyException("Error getting projects from Medusa")
        }

        return response.deserializeAs(object : TypeReference<List<MedusaProjectDTO>>() {})
    }

    private fun String.appendOrder(orderBy: OrderDTO?): String = this + (orderBy?.sortMethod?.let { "_sort=$it" } ?: "")

    companion object {
        private val LOGGER = LoggerFactory.getLogger(MedusaClient::class.java)
    }
}