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
        category: String? = null,
        limit: Int? = null,
        offset: Int? = null
    ): List<MedusaProjectDTO> {
        val endpoint = "/projects?"
            .appendOrder(orderBy)
            .appendParam("creation_date", from, MedusaFilter.GREATER_OR_EQUAL)
            .appendParam("creation_date", to, MedusaFilter.LESS_OR_EQUAL)
            .appendParam("title", nameContains.replaceWhitespaces(), MedusaFilter.CONTAINS)
            .appendParam("category.tag_name", category, MedusaFilter.EQ)
            .appendParam("_limit", limit?.toString())
            .appendParam("_start", offset?.toString())
            .dropLast(1)

        val response = medusaConnector.get(endpoint)

        if (response.isError()) {
            throw FailedDependencyException("Error getting projects from Medusa")
        }

        return response.deserializeAs(object : TypeReference<List<MedusaProjectDTO>>() {})
    }

    open fun top10Projects(): List<MedusaProjectDTO> = getProjects(limit = 10)

    open fun categories(): List<CategoryDTO> {
        val response = medusaConnector.get("/categories")

        if (response.isError()) {
            throw FailedDependencyException("Error getting categories from Medusa")
        }

        return response.deserializeAs(object : TypeReference<List<CategoryDTO>>() {})
    }

    open fun projectCount(): Int {
        val response = medusaConnector.get("/projects/count")

        if (response.isError()) {
            throw FailedDependencyException("Error counting projects from Medusa")
        }

        return response.body?.toInt() ?: throw FailedDependencyException("Medusa returned null for count")
    }

    private fun String.appendOrder(orderBy: OrderDTO?): String = orderBy?.sortMethod?.let { "${this}_sort=$it&" }
        ?: this

    private fun String.appendParam(param: String, value: String?, filter: MedusaFilter): String =
        value?.let { "${this}${param}_${filter.filterName}=$it&" } ?: this

    private fun String.appendParam(param: String, value: String?) = value?.let {"$this${param}=$it&"} ?: this

    private fun String?.replaceWhitespaces(): String? =
        this?.let { this.replace(" ", "+") } ?: this

    companion object {
        private val LOGGER = LoggerFactory.getLogger(MedusaClient::class.java)
    }
}
