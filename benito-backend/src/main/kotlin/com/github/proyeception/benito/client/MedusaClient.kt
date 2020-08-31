package com.github.proyeception.benito.client

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.connector.MultipartMetadataBuilder
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.exception.FailedDependencyException
import com.github.proyeception.benito.exception.NotFoundException
import com.github.proyeception.benito.extension.replaceUrlSpaces
import org.apache.http.entity.ContentType
import org.slf4j.LoggerFactory
import java.io.File

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
            .appendParam("title", nameContains?.replaceUrlSpaces() ?: nameContains, MedusaFilter.CONTAINS)
            .appendParam("category.tag_name", category, MedusaFilter.EQ)
            .appendParam("_limit", limit?.toString())
            .appendParam("_start", offset?.toString())
            .dropLast(1)

        val response = medusaConnector.get(endpoint)

        if (response.isError()) {
            LOGGER.error("Error getting projects from medusa: ${response.body}")
            throw FailedDependencyException("Error getting projects from Medusa")
        }

        return response.deserializeAs(object : TypeReference<List<MedusaProjectDTO>>() {})
    }

    open fun top10Projects(): List<MedusaProjectDTO> = getProjects(limit = 10)

    open fun categories(): List<CategoryDTO> {
        val response = medusaConnector.get("/categories")

        if (response.isError()) {
            LOGGER.error("Error getting categories from medusa: ${response.body}")
            throw FailedDependencyException("Error getting categories from Medusa")
        }

        return response.deserializeAs(object : TypeReference<List<CategoryDTO>>() {})
    }

    open fun projectCount(): Int = count("projects")

    open fun categoriesCount() = count("categories")

    open fun project(id: String): MedusaProjectDTO {
        val response = medusaConnector.get("/projects/${id}")

        if (response.isError()) {
            LOGGER.error("Error getting project from medusa: ${response.body}")
            throw FailedDependencyException("Error getting project from Medusa")
        }

        return response.deserializeAs(object : TypeReference<MedusaProjectDTO>() {})
    }

    open fun saveDocument(projectId: String, name: String, driveId: String, content: String) {
        val endpoint = "/projects/$projectId/documents"

        val document = CreateDocumentDTO(
            fileName = name,
            driveId = driveId,
            content = content
        )

        val response = medusaConnector.post(endpoint, document)

        if (response.isError()) {
            LOGGER.error("Error saving document in medusa: ${response.body}")
            throw FailedDependencyException("Error uploading file with drive ID $driveId from Medusa")
        }
    }

    open fun findUser(userId: String, collection: String): MedusaPersonDTO {
        val endpoint = "/$collection/$userId"

        val response = medusaConnector.get(endpoint)

        return when (response.status) {
            200 -> response.deserializeAs(object : TypeReference<MedusaPersonDTO>() {})
            404 -> {
                LOGGER.error("User not found: ${response.body}")
                throw NotFoundException("User $userId not found in $collection")
            }
            else -> {
                LOGGER.error("Error getting user $userId from '$collection' in medusa: ${response.body}")
                throw FailedDependencyException("Error getting user $userId from '$collection' in medusa")
            }
        }
    }

    open fun createUser(person: CreateMedusaPersonDTO, collection: String): MedusaPersonDTO {
        val endpoint = "/$collection"

        val response = medusaConnector.post(endpoint, person)

        if (response.isError()) {
            LOGGER.error(response.body)
            throw FailedDependencyException("Error when creating a new item in $collection")
        }

        return response.deserializeAs(object : TypeReference<MedusaPersonDTO>() {})
    }

    open fun findUsersBy(collection: String, vararg params: Pair<String, String>): List<MedusaPersonDTO> {
        val formattedParams = params.takeIf { it.isNotEmpty() }
            ?.joinToString("&") { (field, value) -> "$field=$value" }
            ?: ""
        val response = medusaConnector.get("/$collection?$formattedParams")

        if (response.isError()) {
            LOGGER.error(response.body)
            throw FailedDependencyException("Failed to fetch users from medusa")
        }

        return response.deserializeAs(object : TypeReference<List<MedusaPersonDTO>>() {})
    }

    open fun createFile(file: File, filename: String, contentType: ContentType): MedusaFileDTO {
        val multipart = MultipartMetadataBuilder()
            .setText("name", "files")
            .setBinary("files", file, contentType, filename)
            .buildPart()
            .build()
        val response = medusaConnector.post("/upload", multipart)

        if (response.isError()) {
            LOGGER.error(response.body)
            throw FailedDependencyException("Failed to create file")
        }

        return response.deserializeAs(object : TypeReference<List<MedusaFileDTO>>() {}).first()
    }

    private fun count(collection: String): Int {
        val response = medusaConnector.get("/$collection/count")

        if (response.isError()) {
            LOGGER.error("Error counting $collection in medusa: ${response.body}")
            throw FailedDependencyException("Error counting $collection from Medusa")
        }

        return response.body?.toInt() ?: throw FailedDependencyException("Medusa returned null for count")
    }

    private fun String.appendOrder(orderBy: OrderDTO?): String = orderBy?.sortMethod?.let { "${this}_sort=$it&" }
        ?: this

    private fun String.appendParam(param: String, value: String?, filter: MedusaFilter): String =
        value?.let { "${this}${param}_${filter.filterName}=$it&" } ?: this

    private fun String.appendParam(param: String, value: String?) = value?.let { "$this${param}=$it&" } ?: this

    companion object {
        private val LOGGER = LoggerFactory.getLogger(MedusaClient::class.java)
    }
}
