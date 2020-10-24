package com.github.proyeception.benito.config

import com.github.proyeception.benito.job.FileWatcher
import com.github.proyeception.benito.oauth.GoogleDriveClient
import com.github.proyeception.benito.observer.FileObserver
import com.github.proyeception.benito.storage.DriveStorage
import com.typesafe.config.Config
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class WatcherModule {
    @Bean("fileWatcher")
    open fun fileWatcher(
        googleDriveClient: GoogleDriveClient,
        fileObserver: FileObserver,
        driveStorage: DriveStorage,
        config: Config
    ) = FileWatcher(
        driveStorage = driveStorage,
        fileObserver = fileObserver,
        googleDriveClient = googleDriveClient,
        refreshRate = config.getInt("file.watcher.refresh.rate")
    )
}