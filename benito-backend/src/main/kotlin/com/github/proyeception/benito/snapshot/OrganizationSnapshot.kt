package com.github.proyeception.benito.snapshot

import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.dto.OrganizationDTO

class OrganizationSnapshot(
    medusaConnector: Connector
) : Snapshot<OrganizationDTO>(
    refreshRate = 3600,
    endpoint = "/organizations",
    connector = medusaConnector,
    name = "organization"
) {
    fun organizations(): List<OrganizationDTO> = elements
}