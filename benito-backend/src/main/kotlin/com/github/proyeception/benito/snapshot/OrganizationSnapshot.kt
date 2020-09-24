package com.github.proyeception.benito.snapshot

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.HttpConnector
import com.github.proyeception.benito.dto.MedusaOrganizationDTO

open class OrganizationSnapshot(
    medusaConnector: HttpConnector
) : Snapshot<MedusaOrganizationDTO>(
    refreshRate = 180,
    endpoint = "/organizations",
    connector = medusaConnector,
    name = "organization",
    ref = object : TypeReference<List<MedusaOrganizationDTO>>() {}
)