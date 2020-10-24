package com.github.proyeception.benito.observer

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.extension.asyncIO
import com.github.proyeception.benito.extension.mapFirst
import com.github.proyeception.benito.extension.splitBy
import com.github.proyeception.benito.oauth.GoogleDriveClient
import com.github.proyeception.benito.parser.DocumentParser
import com.github.proyeception.benito.service.ProjectService
import com.github.proyeception.benito.utils.FileHelper
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.runBlocking
import org.slf4j.LoggerFactory
import java.time.LocalDateTime

data class Document(
    val driveId: String,
    val name: String,
    val content: String
)

class FileObserver(
    private val googleDriveClient: GoogleDriveClient,
    private val projectService: ProjectService,
    private val documentParser: DocumentParser,
    private val medusaClient: MedusaClient,
    private val fileHelper: FileHelper
) {
    fun notify(files: List<GoogleFileDTO>, projectId: String, lastNotification: LocalDateTime) {
        val project = projectService.findProject(projectId)
        val alreadyExistentDocs = project.documentation ?: emptyList()
        val docs = runBlocking {
            files.map {
                asyncIO {
                    val file = googleDriveClient.downloadFile(it)
                    val content = documentParser.parse(file.inputStream(), file.name) ?: ""

                    fileHelper.deleteFile(file)

                    Document(
                        driveId = it.id,
                        name = it.name,
                        content = content
                    )
                }
            }.awaitAll()
        }

        val (updated, newDocs) = docs.splitBy {
            it.driveId in (project.documentation?.map { d -> d.driveId } ?: emptyList())
        }
            .mapFirst { it.map { u -> u to alreadyExistentDocs.find { d -> d.driveId == u.driveId }?.id!! } }

        updated.forEach {
            updateDocument(
                content = it.first.content,
                documentId = it.second,
                fileName = it.first.name
            )

            LOGGER.info("Document ${it.first.driveId} was updated")
        }

        newDocs.forEach {
            LOGGER.info("Creating new file ${it.driveId}")
            medusaClient.saveDocuments(
                docs = CreateDocumentsDTO(
                    items = listOf(
                        CreateDocumentDTO(
                            fileName = it.name,
                            content = it.content,
                            driveId = it.driveId
                        )
                    )
                ),
                projectId = projectId
            )
        }
    }

    private fun updateDocument(content: String, fileName: String, documentId: String): DocumentationDTO = medusaClient
        .updateDocument(documentId, UpdateDocumentDTO(content = content, fileName = fileName))

    companion object {
        private val LOGGER = LoggerFactory.getLogger(FileObserver::class.java)
    }
}