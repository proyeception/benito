package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.exception.AmbiguousReferenceException
import com.github.proyeception.benito.exception.NotFoundException
import com.github.proyeception.benito.snapshot.OrganizationSnapshot
import com.github.proyeception.benito.utils.FileHelper
import org.apache.http.entity.ContentType
import org.slf4j.LoggerFactory


open class UserService(
    private val medusaClient: MedusaClient,
    private val organizationSnapshot: OrganizationSnapshot,
    private val fileHelper: FileHelper
) {
    open fun findAuthor(userId: String): PersonDTO = findUserById(userId, "authors")

    open fun findSupervisor(userId: String): PersonDTO = findUserById(userId, "supervisors")

    open fun findAuthorByGoogleId(id: String): PersonDTO? = medusaClient.findUsersBy(
        "authors",
        Pair("google_user_id", id)
    )
        .let {
            when (it.size) {
                0 -> null
                1 -> mapMedusaToDomain(it.first())
                else -> {
                    LOGGER.error("Ambiguous google user id $id")
                    throw AmbiguousReferenceException("Ambiguous google user id")
                }
            }
        }

    open fun createAuthor(
        username: String?,
        fullName: String,
        mail: String,
        googleUserId: String,
        googleToken: String,
        profilePicUrl: String?
    ) {
        val image = createImage(googleUserId, profilePicUrl)

        val person = CreateMedusaPersonDTO(
            fullName = fullName,
            username = username,
            mail = mail,
            googleUserId = googleUserId,
            profilePic = image,
            googleToken = googleToken
        )

        medusaClient.createUser(person, "authors")
    }

    private fun findUserById(userId: String, collection: String) = mapMedusaToDomain(medusaClient.findUser(userId, collection))

    private fun createImage(userId: String, profilePicUrl: String?): MedusaFileDTO? = profilePicUrl?.let {
        val image = fileHelper.downloadImage(it, "/tmp/$userId.jpg")
        try {
            // It's necessary to leave this in two separate lines, since finally executes before return
            val response = medusaClient.createFile(
                file = image,
                filename = userId,
                contentType = ContentType.IMAGE_JPEG
            )
            return response
        } finally {
            fileHelper.deleteFile(image)
        }
    }

    private fun mapIdToOrganization(organizationId: String): MedusaOrganizationDTO = organizationSnapshot
        .find { it.id == organizationId }
        ?: throw NotFoundException("No such organization with ID $organizationId was found")

    private fun mapMedusaToDomain(medusa: MedusaPersonDTO): PersonDTO = PersonDTO(
        username = medusa.username,
        fullName = medusa.fullName,
        organizations = medusa.organizations.map { OrganizationDTO(it) },
        profilePicUrl = medusa.profilePic?.url,
        projects = medusa.projects.map {
            ProjectRefDTO(
                id = it.id,
                title = it.title,
                posterUrl = it.poster.url,
                organization = OrganizationDTO(mapIdToOrganization(it.organizationId)),
                description = it.description
            )
        },
        socials = medusa.socials,
        contact = ContactDTO(
            mail = medusa.mail,
            phone = medusa.mail
        )
    )

    companion object {
        private val LOGGER = LoggerFactory.getLogger(UserService::class.java)
    }
}