package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.exception.NotFoundException
import com.github.proyeception.benito.snapshot.OrganizationSnapshot
import org.apache.commons.io.FileUtils
import org.apache.http.entity.ContentType
import java.io.BufferedInputStream
import java.io.ByteArrayOutputStream
import java.io.File
import java.io.InputStream
import java.net.URL


class UserService(
    private val medusaClient: MedusaClient,
    private val organizationSnapshot: OrganizationSnapshot
) {
    fun findAuthor(userId: String): PersonDTO = mapMedusaToDomain(medusaClient.findUser(userId, "authors"))

    fun findSupervisor(userId: String): PersonDTO = mapMedusaToDomain(medusaClient.findUser(userId, "supervisors"))

    fun createAuthor(
        username: String?,
        fullName: String,
        mail: String,
        userId: String,
        profilePicUrl: String?
    ) {
        val image = createImage(userId, profilePicUrl)

        val person = CreateMedusaPersonDTO(
            fullName = fullName,
            username = username,
            mail = mail,
            googleUserId = userId,
            profilePic = image
        )

        medusaClient.createUser(person, "authors")
    }

    private fun createImage(userId: String, profilePicUrl: String?): MedusaFileDTO? = profilePicUrl?.let {
        val url = URL(profilePicUrl)
        val `in`: InputStream = BufferedInputStream(url.openStream())
        val out = ByteArrayOutputStream()
        val buf = ByteArray(1024)
        var n = 0
        while (-1 != `in`.read(buf).also { n = it }) {
            out.write(buf, 0, n)
        }
        out.close()
        `in`.close()
        val imageBytes: ByteArray = out.toByteArray()
        val tmpImageFile = File("/tmp/$userId.jpg")
        FileUtils.writeByteArrayToFile(tmpImageFile, imageBytes)
        val response = medusaClient.createFile(file = tmpImageFile, contentType = ContentType.IMAGE_JPEG)
        FileUtils.deleteQuietly(tmpImageFile)

        return response
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