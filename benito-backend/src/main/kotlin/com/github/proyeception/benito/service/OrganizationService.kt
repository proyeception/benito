package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaGraphClient
import com.github.proyeception.benito.dto.OrganizationDTO
import com.github.proyeception.benito.extension.getOrThrow

open class OrganizationService(
    private val medusaGraphClient: MedusaGraphClient
) {
    open fun find(id: String, withUsers: Boolean): OrganizationDTO =
        OrganizationDTO((medusaGraphClient.organization(id, withUsers).getOrThrow()))

    open fun findAll(withUsers: Boolean): List<OrganizationDTO> =
        medusaGraphClient.organizations(withUsers).getOrThrow().map { OrganizationDTO(it) }
}