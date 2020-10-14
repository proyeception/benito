package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.PendingSupervisorDTO

class SignUpService(
    private val medusaClient: MedusaClient
) {
    fun createPendingSupervisor(supervisor: PendingSupervisorDTO) {
        medusaClient.createPendingSupervisor(supervisor)
    }

}