package com.github.proyeception.benito.config

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.client.MedusaGraphClient
import com.github.proyeception.benito.oauth.GoogleDriveClient
import com.github.proyeception.benito.parser.DocumentParser
import com.github.proyeception.benito.service.*
import com.github.proyeception.benito.snapshot.CategorySnapshot
import com.github.proyeception.benito.storage.*
import com.github.proyeception.benito.utils.FileHelper
import com.github.proyeception.benito.utils.HashHelper
import org.springframework.context.annotation.Bean
import com.typesafe.config.Config

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
        statsService: StatsService,
	    permissionsStorage: PermissionsStorage,
        categoriesService: CategoriesService
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
	    statsService = statsService,
        categoriesService = categoriesService
    )

    @Bean
    open fun categoriesService(
        categorySnapshot: CategorySnapshot
    ): CategoriesService = CategoriesService(
        categorySnapshot = categorySnapshot
    )

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
        medusaGraphClient: MedusaGraphClient
    ): OrganizationService = OrganizationService(
        medusaGraphClient = medusaGraphClient
    )

    @Bean
    open fun recommendationService(
        medusaClient: MedusaClient,
        recommendationStorage: RecommendationStorage,
        keywordService: KeywordService
    ): RecommendationService = RecommendationService(
        medusaClient = medusaClient,
        recommendationStorage = recommendationStorage,
        keywordService = keywordService
    )

    @Bean
    open fun keywordService(
        config: Config
    ): KeywordService = KeywordService(
        host = config.getString("pitonisio.host")
    )

    @Bean
    open fun signUpService(
        medusaClient: MedusaClient,
        fileService: FileService,
        userService: UserService,
        permissionService: PermissionService
    ): SignUpService = SignUpService(medusaClient, fileService, userService, permissionService)

    @Bean
    open fun statsService(
        statsStorage: StatsStorage,
        medusaClient: MedusaClient,
        categoriesService: CategoriesService
    ): StatsService = StatsService(statsStorage, medusaClient, categoriesService)

    @Bean
    open fun permissionsService(
        permissionsStorage: PermissionsStorage,
        googleClient: GoogleDriveClient
    ): PermissionService = PermissionService(
        permissionsStorage = permissionsStorage,
        googleDriveClient = googleClient
    )
}
