package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.CountDTO

open class CategoriesService(
    private val medusaClient: MedusaClient
) {
    open fun categories() = medusaClient.categories()

    open fun count() = CountDTO(medusaClient.categoriesCount())
}