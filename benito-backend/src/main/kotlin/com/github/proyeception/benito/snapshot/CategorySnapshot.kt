package com.github.proyeception.benito.snapshot

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.HttpConnector
import com.github.proyeception.benito.dto.CategoryDTO

class CategorySnapshot(
    medusaConnector: HttpConnector
) : Snapshot<CategoryDTO>(
    name = "categories",
    refreshRate = 180,
    endpoint = "/categories",
    ref = object : TypeReference<List<CategoryDTO>>() {},
    connector = medusaConnector
)