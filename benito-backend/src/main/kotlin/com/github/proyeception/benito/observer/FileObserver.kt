package com.github.proyeception.benito.observer

import com.github.proyeception.benito.dto.GoogleFileDTO
import com.github.proyeception.benito.oauth.GoogleDriveClient
import com.github.proyeception.benito.service.ProjectService

class FileObserver(
    private val googleDriveClient: GoogleDriveClient,
    private val projectService: ProjectService
) {
    fun notify(file: GoogleFileDTO, projectId: String) {

    }
}