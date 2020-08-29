package com.github.proyeception.benito.snapshot

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.dto.MedusaOrganizationDTO

open class OrganizationSnapshot(
    medusaConnector: Connector
) : Snapshot<MedusaOrganizationDTO>(
    refreshRate = 3600,
    endpoint = "/organizations",
    connector = medusaConnector,
    name = "organization",
    ref = object : TypeReference<List<MedusaOrganizationDTO>>() {}
)