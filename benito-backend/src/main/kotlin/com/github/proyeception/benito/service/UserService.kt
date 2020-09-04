package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.exception.AmbiguousReferenceException
import com.github.proyeception.benito.exception.NotFoundException
import com.github.proyeception.benito.snapshot.OrganizationSnapshot
import org.slf4j.LoggerFactory

open class UserService(
    private val medusaClient: MedusaClient,
    private val organizationSnapshot: OrganizationSnapshot,
    private val fileService: FileService
) {
    open fun findAuthor(userId: String): PersonDTO = findUserById(userId, "authors")

    open fun findSupervisor(userId: String): PersonDTO = findUserById(userId, "supervisors")

    open fun findSupervisorByGoogleId(id: String): PersonDTO? = findUserByGoogleId(id, "supervisors")

    open fun findAuthorByGoogleId(id: String): PersonDTO? = findUserByGoogleId(id, "authors")

    open fun findSupervisorByEmail(mail: String): PersonDTO? = findOneUserBy(
        "supervisors",
        Pair("mail", mail)
    )

    open fun createAuthor(
        username: String?,
        fullName: String,
        mail: String,
        googleUserId: String,
        googleToken: String,
        profilePicUrl: String?
    ): MedusaPersonDTO {
        val image = createImage(googleUserId, profilePicUrl)

        val person = CreateMedusaPersonDTO(
            fullName = fullName,
            username = username,
            mail = mail,
            googleUserId = googleUserId,
            profilePic = image,
            googleToken = googleToken
        )

        return medusaClient.createUser(person, "authors")
    }

    private fun findUserByGoogleId(id: String, coll: String): PersonDTO? = findOneUserBy(
        coll,
        Pair("google_user_id", id)
    )

    private fun findOneUserBy(coll: String, vararg filters: Pair<String, String>): PersonDTO? = medusaClient
        .findUsersBy(
            coll,
            *filters
        )
        .let {
            when (it.size) {
                0 -> null
                1 -> mapMedusaToDomain(it.first())
                else -> {
                    LOGGER.error("Ambiguous filter $filters")
                    throw AmbiguousReferenceException("Ambiguous filter")
                }
            }
        }

    private fun findUserById(userId: String, collection: String) = mapMedusaToDomain(medusaClient.findUser(userId, collection))

    private fun createImage(userId: String, profilePicUrl: String?): MedusaFileDTO? = profilePicUrl?.let {
        fileService.createMedusaImageFromUrl(it, "/tmp/$userId.jpg")
    }

    private fun mapIdToOrganization(organizationId: String): MedusaOrganizationDTO = organizationSnapshot
        .find { it.id == organizationId }
        ?: throw NotFoundException("No such organization with ID $organizationId was found")

    private fun mapMedusaToDomain(medusa: MedusaPersonDTO): PersonDTO = PersonDTO(
        id = medusa.id,
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