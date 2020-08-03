package com.github.proyeception.benito.client

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.dto.CategoryDTO
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
            .appendParam("title", nameContains.replaceWhitespaces(), MedusaFilter.CONTAINS)
            .appendParam("tags", tags, MedusaFilter.EQ)
            .dropLast(1)

        val response = medusaConnector.get(endpoint)
        LOGGER.info(response.body)

        if (response.isError()) {
            throw FailedDependencyException("Error getting projects from Medusa")
        }

        return response.deserializeAs(object : TypeReference<List<MedusaProjectDTO>>() {})
    }

    fun top10Projects(): List<MedusaProjectDTO> {
        // TODO: add project click tracking and then ask for projects sorted by most visited
        val response = medusaConnector.get("/projects?_limit=10")
        LOGGER.info(response.body)

        if (response.isError()) {
            throw FailedDependencyException("Error getting top 10 from Medusa")
        }

        return response.deserializeAs(object : TypeReference<List<MedusaProjectDTO>>() {})
    }

    open fun categories(): List<CategoryDTO> {
        val response = medusaConnector.get("/categories")
        LOGGER.info(response.body)

        if (response.isError()) {
            throw FailedDependencyException("Error getting categories from Medusa")
        }

        return response.deserializeAs(object : TypeReference<List<CategoryDTO>>() {})
    }

    open fun count(): Int {
        val response = medusaConnector.get("/projects/count")
        LOGGER.info(response.body)

        if (response.isError()) {
            throw FailedDependencyException("Error counting projects from Medusa")
        }

        return response.body?.toInt() ?: throw FailedDependencyException("Medusa returned null for count")
    }

    private fun String.appendOrder(orderBy: OrderDTO?): String = orderBy?.sortMethod?.let { "${this}_sort=$it&" }
        ?: this

    private fun String.appendParam(param: String, value: String?, filter: MedusaFilter): String =
        value?.let { "${this}${param}_${filter.filterName}=$it&" } ?: this

    private fun String?.replaceWhitespaces(): String? =
        this?.let { this.replace(" ", "+") } ?: this

    companion object {
        private val LOGGER = LoggerFactory.getLogger(MedusaClient::class.java)
    }
}
