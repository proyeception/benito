package com.github.proyeception.benito.snapshot

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.dto.CategoryDTO

class CategorySnapshot(
    medusaConnector: Connector
) : Snapshot<CategoryDTO>(
    name = "categories",
    refreshRate = 180,
    endpoint = "/categories",
    ref = object : TypeReference<List<CategoryDTO>>() {},
    connector = medusaConnector
)