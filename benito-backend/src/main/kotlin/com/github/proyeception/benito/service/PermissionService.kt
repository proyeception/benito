package com.github.proyeception.benito.service

import com.github.proyeception.benito.oauth.GoogleDriveClient
import com.github.proyeception.benito.storage.PermissionsStorage
import org.slf4j.LoggerFactory

class PermissionService(
    private val permissionsStorage: PermissionsStorage,
    private val googleDriveClient: GoogleDriveClient
) {
    fun givePermission(driveFolderId: String, mail: String) {
        googleDriveClient.giveWriterPermission(mail = mail, fileId = driveFolderId)
            .fold(
                ifLeft = {
                    LOGGER.error("Failed to give write permission for $driveFolderId to $mail", it)
                    null
                },
                ifRight = {
                    permissionsStorage.save(
                        mail = mail,
                        fileId = driveFolderId,
                        permissionId = it.id

                    )
                }
            )
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(PermissionService::class.java)
    }
}