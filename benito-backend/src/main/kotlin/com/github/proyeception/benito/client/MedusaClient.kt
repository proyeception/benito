package com.github.proyeception.benito.client

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.dto.MedusaFilter
import com.github.proyeception.benito.dto.MedusaProjectDTO
import com.github.proyeception.benito.dto.OrderDTO
import com.github.proyeception.benito.exception.FailedDependencyException
import org.slf4j.LoggerFactory

open class MedusaClient(
        private val medusaConnector: Connector
) {
    open fun getProjects(
            orderBy: OrderDTO? = null,
            from: String? = null,
            to: String? = null,
            nameContains: String? = null,
            tags: String? = null
    ): List<MedusaProjectDTO> {
        val endpoint = "/projects?"
                .appendOrder(orderBy)
                .appendParam("creation_date", from, MedusaFilter.GREATER_OR_EQUAL)
                .appendParam("creation_date", to, MedusaFilter.LESS_OR_EQUAL)
                .appendParam("title", nameContains, MedusaFilter.CONTAINS)
                .appendParam("tags", tags, MedusaFilter.IN)
                .dropLast(1)

        val response = medusaConnector.get(endpoint)
        LOGGER.info(response.body)

        if (response.isError()) {
            throw FailedDependencyException("Error getting projects from Medusa")
        }

        return response.deserializeAs(object : TypeReference<List<MedusaProjectDTO>>() {})
    }

    private fun String.appendOrder(orderBy: OrderDTO?): String = orderBy?.sortMethod?.let { "${this}_sort=$it&" } ?: this

    private fun String.appendParam(param: String, value: String?, filter: MedusaFilter): String =
            value?.let { "${this}${param}_${filter.filterName}=$it&" } ?: this

    companion object {
        private val LOGGER = LoggerFactory.getLogger(MedusaClient::class.java)
    }
}