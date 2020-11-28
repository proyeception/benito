package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.AuthorSignUpDTO
import com.github.proyeception.benito.dto.CreatePendingSupervisorDTO
import com.github.proyeception.benito.dto.PersonDTO
import com.github.proyeception.benito.dto.UpdateUserDTO
import com.github.proyeception.benito.exception.BadRequestException
import com.github.proyeception.benito.extension.fromCamelToKebab
import org.apache.http.entity.ContentType
import org.slf4j.LoggerFactory

class SignUpService(
    private val medusaClient: MedusaClient,
    private val fileService: FileService,
    private val userService: UserService
) {
    fun createPendingSupervisor(supervisor: CreatePendingSupervisorDTO) {
        LOGGER.info("New supervisor sign up: {}", supervisor)
        val file = supervisor.profilePic?.let {
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

    fun createAuthor(author: AuthorSignUpDTO): PersonDTO {
        val user = userService.findAuthorByEmail(author.mail)

        return user?.let {
            if (it.ghost) {
                userService.updateAuthor(it.id, UpdateUserDTO(ghost = false))
            } else {
                throw BadRequestException("User ${author.mail} already exists")
            }
        } ?: userService.createAuthor(
            fullName = author.fullName,
            profilePicUrl = author.profilePic,
            googleUserId = author.googleUserId,
            username = author.fullName.fromCamelToKebab(),
            mail = author.mail,
            googleToken = author.token,
            organizationId = author.organizationId
        )
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(SignUpService::class.java)
    }
}