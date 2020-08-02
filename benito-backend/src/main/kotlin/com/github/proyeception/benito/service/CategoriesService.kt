package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient

open class CategoriesService(
    private val medusaClient: MedusaClient
) {
    open fun categories() = medusaClient.categories()
}