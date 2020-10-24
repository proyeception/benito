package com.github.proyeception.benito.observer

import com.github.proyeception.benito.dto.GoogleFileDTO
import com.github.proyeception.benito.oauth.GoogleDriveClient
import com.github.proyeception.benito.service.ProjectService
import com.github.proyeception.benito.utils.FileHelper
import org.apache.tika.mime.MimeTypes
import org.slf4j.LoggerFactory
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.format.DateTimeFormatter

class FileObserver(
    private val googleDriveClient: GoogleDriveClient,
    private val projectService: ProjectService,
    private val fileHelper: FileHelper
) {
    fun notify(file: GoogleFileDTO, projectId: String, lastNotification: LocalDateTime) {
        googleDriveClient
            .query("'${file.id}' in parents and modifiedDate >= '${lastNotification.format(FORMATTER)}'")
            .fold(
                ifLeft = { LOGGER.warn("Failed to retrieve files in folder ${file.id}") },
                ifRight = {
                    val files = it.map { f ->
                        val file = f.webContentLink?.let { wcl ->
                            val extension = MimeTypes.getDefaultMimeTypes()
                                .forName(f.mimeType)
                                .extension

                            fileHelper.downloadFromUrl(wcl, "/tmp/${file.id}$extension")
                        } ?: googleDriveClient.export(f)
                        file to f.id
                    }
                    projectService.saveDriveDocuments(projectId, files)
                }
            )
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(FileObserver::class.java)
        private val FORMATTER = DateTimeFormatter
            .ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
            .withZone(ZoneId.of("UTC"))
    }
}