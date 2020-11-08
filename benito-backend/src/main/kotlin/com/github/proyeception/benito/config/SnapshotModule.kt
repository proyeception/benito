package com.github.proyeception.benito.config

import com.github.proyeception.benito.connector.HttpConnector
import com.github.proyeception.benito.snapshot.CategorySnapshot
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class SnapshotModule {
    @Bean
    open fun categorySnapshot(
        @Qualifier("medusaConnector") medusaConnector: HttpConnector
    ) = CategorySnapshot(medusaConnector = medusaConnector)
}