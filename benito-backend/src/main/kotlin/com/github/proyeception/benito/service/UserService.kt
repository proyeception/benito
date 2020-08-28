package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.MedusaPersonDTO
import com.github.proyeception.benito.dto.OrganizationDTO
import com.github.proyeception.benito.dto.PersonDTO
import com.github.proyeception.benito.dto.ProjectRefDTO
import com.github.proyeception.benito.exception.NotFoundException
import com.github.proyeception.benito.snapshot.OrganizationSnapshot

class UserService(
    private val medusaClient: MedusaClient,
    private val organizationSnapshot: OrganizationSnapshot
) {
    fun findAuthor(userId: String): PersonDTO = mapMedusaToDomain(medusaClient.findUser(userId, "authors"))

    fun findSupervisor(userId: String): PersonDTO = mapMedusaToDomain(medusaClient.findUser(userId, "supervisors"))

    private fun mapIdToOrganization(organizationId: String): OrganizationDTO = organizationSnapshot
        .organizations()
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
                organization = mapIdToOrganization(it.organizationId),
                description = it.description
            )
        },
        socials = medusa.socials
    )
}