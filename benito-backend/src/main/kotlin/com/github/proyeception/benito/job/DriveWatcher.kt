package com.github.proyeception.benito.job

import com.github.proyeception.benito.extension.launchIOAsync
import com.github.proyeception.benito.oauth.GoogleDriveClient
import com.github.proyeception.benito.observer.FileObserver
import com.github.proyeception.benito.storage.Drive
import com.github.proyeception.benito.storage.DriveStorage
import org.slf4j.LoggerFactory
import java.time.LocalDateTime

class DriveWatcher(
    private val googleDriveClient: GoogleDriveClient,
    private val fileObserver: FileObserver,
    driveStorage: DriveStorage
) {
    private val driveFolders = mutableListOf<Drive>()
    private var lastNotification = LocalDateTime.now()

    init {
        driveStorage.findOpen().forEach { driveFolders.add(it) }
        launchIOAsync { poll() }
    }

    fun watch(drive: Drive) {
        driveFolders.add(drive)
    }

    fun unwatch(driveFolderId: String) {
        driveFolders.removeIf { it.driveFolderId == driveFolderId }
    }

    private fun poll() {
        driveFolders.forEach {
            googleDriveClient
                .getFile(fileId = it.driveFolderId)
                .fold(
                    ifLeft = { e -> LOGGER.warn("Failed to retrieve file $it", e) },
                    ifRight = { f -> if (f.modifiedTime.isAfter(lastNotification)) fileObserver.notify(f, it.projectId) }
                )
        }
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(DriveWatcher::class.java)
    }
}