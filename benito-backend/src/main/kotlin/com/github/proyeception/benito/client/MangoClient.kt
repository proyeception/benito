package com.github.proyeception.benito.client

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.dto.ProjectDTO
import com.github.proyeception.benito.dto.UserInfoDTO
import com.github.proyeception.benito.exception.NotFoundException
import org.slf4j.LoggerFactory

open class MangoClient(
    private val mangoConnector: Connector
) {
    open fun findUser(
        username: String,
        password: String,
        userType: String
    ): UserInfoDTO {
        LOGGER.info("Find user data for user $username with type $userType")

        val response = mangoConnector.get("/mango/users?username=$username&password=$password&userType=$userType")

        if (response.isError()) {
            LOGGER.error("Mango responded with status code {}: {}", response.status, response.body)
            throw NotFoundException("Failed to retrieve user $username")
        }

        return response.deserializeAs(object : TypeReference<UserInfoDTO>() {})
    }

    open fun getProjects(): List<ProjectDTO> {
        val response = this.mangoConnector.get("/mango/projects")

        return if (response.isError()) {
            throw NotFoundException("Error while finding all projects")
        } else {
            response.deserializeAs(object : TypeReference<List<ProjectDTO>>() {})
        }
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(MangoClient::class.java)
    }
}