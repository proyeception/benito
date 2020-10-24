package com.github.proyeception.benito.config

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.client.MedusaGraphClient
import com.github.proyeception.benito.job.FileWatcher
import com.github.proyeception.benito.oauth.GoogleDriveClient
import com.github.proyeception.benito.parser.DocumentParser
import com.github.proyeception.benito.service.*
import com.github.proyeception.benito.snapshot.CategorySnapshot
import com.github.proyeception.benito.snapshot.OrganizationSnapshot
import com.github.proyeception.benito.storage.*
import com.github.proyeception.benito.utils.FileHelper
import com.github.proyeception.benito.utils.HashHelper
import org.springframework.context.annotation.Bean

open class ServiceModule {
    @Bean
    open fun projectService(
        medusaClient: MedusaClient,
        documentParser: DocumentParser,
        documentService: DocumentService,
        fileService: FileService,
        medusaGraphClient: MedusaGraphClient,
        keywordService: KeywordService, //sacar
        recommendationService: RecommendationService,
        driveStorage: DriveStorage,
        googleDriveClient: GoogleDriveClient,
        permissionsStorage: PermissionsStorage,
        fileWatcher: FileWatcher
    ): ProjectService = ProjectService(
        medusaClient = medusaClient,
        documentParser = documentParser,
        documentService = documentService,
        fileService = fileService,
        medusaGraphClient = medusaGraphClient,
        keywordService = keywordService, //sacar
        recommendationService = recommendationService,
        driveStorage = driveStorage,
        googleDriveClient = googleDriveClient,
        permissionsStorage = permissionsStorage,
        fileWatcher = fileWatcher
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
        organizationService: OrganizationService,
        fileService: FileService,
        projectService: ProjectService,
        hashHelper: HashHelper,
        customizationStorage: CustomizationStorage
    ): UserService = UserService(
        medusaClient = medusaClient,
        organizationService = organizationService,
        fileService = fileService,
        customizationStorage = customizationStorage,
        projectService = projectService,
        hashUtils = hashHelper
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
    open fun sessionService(
        sessionStorage: SessionStorage
    ): SessionService = SessionService(sessionStorage)

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

    @Bean
    open fun recommendationService(
        medusaClient: MedusaClient,
        recommendationStorage: RecommendationStorage
    ): RecommendationService = RecommendationService(
        medusaClient = medusaClient,
        recommendationStorage = recommendationStorage
    )

    @Bean
    open fun keywordService(): KeywordService = KeywordService()

    @Bean
    open fun signUpService(
        medusaClient: MedusaClient,
        fileService: FileService
    ): SignUpService = SignUpService(medusaClient, fileService)
}