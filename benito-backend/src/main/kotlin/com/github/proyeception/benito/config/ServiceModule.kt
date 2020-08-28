package com.github.proyeception.benito.config

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.oauth.GoogleDriveClient
import com.github.proyeception.benito.parser.DocumentParser
import com.github.proyeception.benito.service.CategoriesService
import com.github.proyeception.benito.service.DocumentService
import com.github.proyeception.benito.service.ProjectService
import com.github.proyeception.benito.service.UserService
import com.github.proyeception.benito.snapshot.OrganizationSnapshot
import org.springframework.context.annotation.Bean


open class ServiceModule {
    @Bean
    open fun projectService(
        medusaClient: MedusaClient,
        documentParser: DocumentParser,
        documentService: DocumentService
    ): ProjectService = ProjectService(
        medusaClient = medusaClient,
        documentParser = documentParser,
        documentService = documentService
    )

    @Bean
    open fun categoriesService(
        medusaClient: MedusaClient
    ): CategoriesService = CategoriesService(medusaClient = medusaClient)

    @Bean
    open fun documentService(
        googleClient: GoogleDriveClient
    ): DocumentService = DocumentService(
        googleClient = googleClient
    )

    @Bean
    open fun userService(
        medusaClient: MedusaClient,
        organizationSnapshot: OrganizationSnapshot
    ): UserService = UserService(
        medusaClient = medusaClient,
        organizationSnapshot = organizationSnapshot
    )
}