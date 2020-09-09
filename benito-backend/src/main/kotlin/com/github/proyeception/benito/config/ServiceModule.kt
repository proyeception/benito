package com.github.proyeception.benito.config

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.oauth.GoogleDriveClient
import com.github.proyeception.benito.parser.DocumentParser
import com.github.proyeception.benito.service.*
import com.github.proyeception.benito.snapshot.CategorySnapshot
import com.github.proyeception.benito.snapshot.OrganizationSnapshot
import com.github.proyeception.benito.utils.FileHelper
import com.github.proyeception.benito.utils.HashHelper
import org.springframework.context.annotation.Bean

open class ServiceModule {
    @Bean
    open fun projectService(
        medusaClient: MedusaClient,
        documentParser: DocumentParser,
        documentService: DocumentService,
        fileService: FileService
    ): ProjectService = ProjectService(
        medusaClient = medusaClient,
        documentParser = documentParser,
        documentService = documentService,
        fileService = fileService
    )

    @Bean
    open fun categoriesService(
        categorySnapshot: CategorySnapshot
    ): CategoriesService = CategoriesService(categorySnapshot = categorySnapshot)

    @Bean
    open fun documentService(
        googleClient: GoogleDriveClient
    ): DocumentService = DocumentService(
        googleClient = googleClient
    )

    @Bean
    open fun userService(
        medusaClient: MedusaClient,
        organizationSnapshot: OrganizationSnapshot,
        fileService: FileService
    ): UserService = UserService(
        medusaClient = medusaClient,
        organizationSnapshot = organizationSnapshot,
        fileService = fileService
    )

    @Bean
    open fun authorizationService(
        userService: UserService,
        sessionService: SessionService,
        hashHelper: HashHelper
    ): AuthenticationService = AuthenticationService(
        userService = userService,
        sessionService = sessionService,
        hash = hashHelper
    )

    @Bean
    open fun sessionService(): SessionService = SessionService()

    @Bean
    open fun fileService(
        medusaClient: MedusaClient,
        fileHelper: FileHelper
    ) = FileService(
        fileHelper = fileHelper,
        medusaClient = medusaClient
    )

    @Bean
    open fun organizationService(
        medusaClient: MedusaClient,
        organizationSnapshot: OrganizationSnapshot
    ): OrganizationService = OrganizationService(
        medusaClient = medusaClient,
        organizationSnapshot = organizationSnapshot
    )
}