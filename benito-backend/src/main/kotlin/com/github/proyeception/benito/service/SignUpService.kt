package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.CreatePendingSupervisorDTO
import org.apache.http.entity.ContentType
import org.slf4j.LoggerFactory

class SignUpService(
    private val medusaClient: MedusaClient,
    private val fileService: FileService
) {
    fun createPendingSupervisor(supervisor: CreatePendingSupervisorDTO) {
        LOGGER.info("New supervisor sign up: {}", supervisor)
        val file = supervisor.profilePic?. let {
            fileService.createMedusaFileFromUrl(
                url = it,
                fileName = "$${supervisor.googleUserId}.jpg",
                contentType = ContentType.IMAGE_JPEG,
                filePath = "/tmp/${supervisor.googleUserId}.jpg"
            )
        }

        // hack because we receive the url of the object, but Medusa expects a file or an id to a file
        medusaClient.createPendingSupervisor(supervisor.copy(profilePic = file?.id))
    }


    companion object {
        private val LOGGER = LoggerFactory.getLogger(SignUpService::class.java)
    }
}