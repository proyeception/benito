package com.github.proyeception.benito.snapshot

import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.dto.MedusaOrganizationDTO

open class OrganizationSnapshot(
    medusaConnector: Connector
) : Snapshot<MedusaOrganizationDTO>(
    refreshRate = 3600,
    endpoint = "/organizations",
    connector = medusaConnector,
    name = "organization"
) {
    open fun organizations(): List<MedusaOrganizationDTO> = elements
}