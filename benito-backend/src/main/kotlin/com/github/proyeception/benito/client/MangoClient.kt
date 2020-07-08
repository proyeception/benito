package com.github.proyeception.benito.client

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.dto.UserInfoDTO
import com.github.proyeception.benito.exception.NotFoundException
import org.slf4j.LoggerFactory

open class MangoClient(
    private val mangoConnector: Connector
) {
    fun findUser(
        username: String,
        password: String,
        userType: String
    ): UserInfoDTO {
        LOGGER.info("Find user data for user $username with type $userType")

        val response = mangoConnector.get("/mango/users?username=$username&password=$password&usertype=$userType")

        if (response.isError()) {
            LOGGER.error("Error retrieving $username")
            LOGGER.error("Mango responded with status code {}: {}", response.status, response.body)
            throw NotFoundException("Failed to retrieve user $username")
        }

        return response.deserializeAs(object : TypeReference<UserInfoDTO>() {})
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(MangoClient::class.java)
    }
}