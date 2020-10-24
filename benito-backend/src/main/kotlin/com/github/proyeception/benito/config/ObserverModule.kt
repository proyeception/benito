package com.github.proyeception.benito.config

import com.github.proyeception.benito.oauth.GoogleDriveClient
import com.github.proyeception.benito.observer.FileObserver
import com.github.proyeception.benito.service.ProjectService
import com.github.proyeception.benito.utils.FileHelper
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class ObserverModule {
    @Bean("fileObserver")
    open fun fileObserver(
        projectService: ProjectService,
        googleDriveClient: GoogleDriveClient,
        fileHelper: FileHelper
    ): FileObserver = FileObserver(
        googleDriveClient = googleDriveClient,
        projectService = projectService,
        fileHelper = fileHelper
    )
}