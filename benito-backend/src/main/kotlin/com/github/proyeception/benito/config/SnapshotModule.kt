package com.github.proyeception.benito.config

import com.github.proyeception.benito.connector.HttpConnector
import com.github.proyeception.benito.snapshot.CategorySnapshot
import com.github.proyeception.benito.snapshot.OrganizationSnapshot
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class SnapshotModule {
    @Bean
    open fun organizationSnapshot(
        @Qualifier("medusaConnector") medusaConnector: HttpConnector
    ) = OrganizationSnapshot(medusaConnector = medusaConnector)

    @Bean
    open fun categorySnapshot(
        @Qualifier("medusaConnector") medusaConnector: HttpConnector
    ) = CategorySnapshot(medusaConnector = medusaConnector)
}