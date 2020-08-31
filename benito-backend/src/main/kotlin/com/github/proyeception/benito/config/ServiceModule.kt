package com.github.proyeception.benito.config

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.oauth.GoogleAccountClient
import com.github.proyeception.benito.oauth.GoogleDriveClient
import com.github.proyeception.benito.parser.DocumentParser
import com.github.proyeception.benito.repository.UserLoginRepository
import com.github.proyeception.benito.service.*
import com.github.proyeception.benito.snapshot.CategorySnapshot
import com.github.proyeception.benito.snapshot.OrganizationSnapshot
import com.github.proyeception.benito.utils.FileHelper
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
        fileHelper: FileHelper
    ): UserService = UserService(
        medusaClient = medusaClient,
        organizationSnapshot = organizationSnapshot,
        fileHelper = fileHelper
    )

    @Bean
    open fun authorizationService(
        googleAccountClient: GoogleAccountClient,
        userService: UserService,
        sessionService: SessionService
    ): AuthorizationService = AuthorizationService(
        googleAccountClient = googleAccountClient,
        userService = userService,
        sessionService = sessionService
    )

    @Bean
    open fun sessionService(): SessionService = SessionService()
}