package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.exception.NotFoundException
import com.github.proyeception.benito.snapshot.OrganizationSnapshot
import com.github.proyeception.benito.utils.FileHelper
import org.apache.http.entity.ContentType


class UserService(
    private val medusaClient: MedusaClient,
    private val organizationSnapshot: OrganizationSnapshot,
    private val fileHelper: FileHelper
) {
    fun findAuthor(userId: String): PersonDTO = mapMedusaToDomain(medusaClient.findUser(userId, "authors"))

    fun findSupervisor(userId: String): PersonDTO = mapMedusaToDomain(medusaClient.findUser(userId, "supervisors"))

    fun findAuthorByGoogleToken(token: String): PersonDTO? = medusaClient.findUsersBy(
        "authors",
        Pair("google_token", token)
    )
        .firstOrNull()
        ?.let { mapMedusaToDomain(it) }

    fun createAuthor(
        username: String?,
        fullName: String,
        mail: String,
        userId: String,
        googleToken: String,
        profilePicUrl: String?
    ) {
        val image = createImage(userId, profilePicUrl)

        val person = CreateMedusaPersonDTO(
            fullName = fullName,
            username = username,
            mail = mail,
            googleUserId = userId,
            profilePic = image,
            googleToken = googleToken
        )

        medusaClient.createUser(person, "authors")
    }

    private fun createImage(userId: String, profilePicUrl: String?): MedusaFileDTO? = profilePicUrl?.let {
        val image = fileHelper.downloadImage(it, "/tmp/$userId.jpg")
        try {
            return medusaClient.createFile(image, ContentType.IMAGE_JPEG)
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
}