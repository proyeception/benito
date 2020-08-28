package com.github.proyeception.benito.config

import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.snapshot.OrganizationSnapshot
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class SnapshotModule {
    @Bean
    open fun organizationsSnapshot(
        @Qualifier("medusaConnector") medusaConnector: Connector
    ) = OrganizationSnapshot(medusaConnector = medusaConnector)
}