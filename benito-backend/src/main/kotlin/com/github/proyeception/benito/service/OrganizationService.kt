package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.OrganizationDTO
import com.github.proyeception.benito.exception.NotFoundException
import com.github.proyeception.benito.snapshot.OrganizationSnapshot

open class OrganizationService(
    private val medusaClient: MedusaClient,
    private val organizationSnapshot: OrganizationSnapshot
) {
    open fun find(id: String, cached: Boolean = true): OrganizationDTO =
        (if (cached) organizationSnapshot.find { it.id == id } else medusaClient.findOrganization(id))?.let {
            OrganizationDTO(it)
        } ?: throw NotFoundException("Organization $id not found")

    open fun findAll(cached: Boolean): List<OrganizationDTO> =
        (if (cached) organizationSnapshot.findAll() else medusaClient.findOrganizations()).map { OrganizationDTO(it) }
}