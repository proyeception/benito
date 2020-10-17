package com.github.proyeception.benito.config

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.client.MedusaGraphClient
import com.github.proyeception.benito.mongodb.MongoTextSearch
import com.github.proyeception.benito.oauth.GoogleDriveClient
import com.github.proyeception.benito.parser.DocumentParser
import com.github.proyeception.benito.service.*
import com.github.proyeception.benito.snapshot.CategorySnapshot
import com.github.proyeception.benito.snapshot.OrganizationSnapshot
import com.github.proyeception.benito.storage.RecommendationStorage
import com.github.proyeception.benito.storage.SessionStorage
import com.github.proyeception.benito.utils.FileHelper
import com.github.proyeception.benito.utils.HashHelper
import com.typesafe.config.Config
import org.springframework.context.annotation.Bean

open class ServiceModule {
    @Bean
    open fun projectService(
        medusaClient: MedusaClient,
        documentParser: DocumentParser,
        documentService: DocumentService,
        fileService: FileService,
        mongoTextSearch: MongoTextSearch,
        medusaGraphClient: MedusaGraphClient,
        keywordService: KeywordService, //sacar
        recommendationService: RecommendationService
    ): ProjectService = ProjectService(
        medusaClient = medusaClient,
        documentParser = documentParser,
        documentService = documentService,
        fileService = fileService,
        mongoTextSearch = mongoTextSearch,
        medusaGraphClient = medusaGraphClient,
        keywordService = keywordService, //sacar
        recommendationService = recommendationService
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
        fileService: FileService
    ): UserService = UserService(
        medusaClient = medusaClient,
        organizationService = organizationService,
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
    open fun mongoTextSearch(
        config: Config
    ): MongoTextSearch {
        val storageConfig = config.getConfig("storage")

        return MongoTextSearch(
            user = storageConfig.getString("user"),
            databaseName = storageConfig.getString("db.name"),
            port = storageConfig.getInt("port"),
            password = System.getenv("DB_PASSWORD") ?: storageConfig.getString("password"),
            host = storageConfig.getString("host")
        )
    }

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