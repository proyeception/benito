package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.PersonDTO

class UserService(
    private val medusaClient: MedusaClient
) {
    fun findAuthor(userId: String): PersonDTO = PersonDTO(medusaClient.findUser(userId, "authors"))

    fun findSupervisor(userId: String): PersonDTO = PersonDTO(medusaClient.findUser(userId, "supervisors"))
}