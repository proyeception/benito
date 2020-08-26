package com.github.proyeception.benito.oauth

import arrow.core.Either
import arrow.core.flatMap
import arrow.core.left
import arrow.core.right
import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.dto.FileCreatedDTO
import com.github.proyeception.benito.dto.FileDTO
import com.github.proyeception.benito.dto.MetadataDTO
import com.github.proyeception.benito.dto.QueryDTO
import com.github.proyeception.benito.exception.AmbiguousReferenceException
import com.github.proyeception.benito.extension.replaceUrlSpaces
import com.github.scribejava.apis.GoogleApi20
import org.slf4j.LoggerFactory
import org.springframework.web.multipart.MultipartFile
import java.util.*

open class GoogleDriveOAuthClient(
    token: String,
    clientId: String,
    clientSecret: String,
    callbackRoute: String,
    objectMapper: ObjectMapper
) : OAuthClient(
    instance = GoogleApi20.instance(),
    scope = "https://www.googleapis.com/auth/drive",
    clientId = clientId,
    clientSecret = clientSecret,
    callbackRoute = callbackRoute,
    token = token,
    objectMapper = objectMapper
) {

    /*
    * Queda pendiente el terminar de crear nuevos usuarios
    * Habría que validar con el secret que un forro con postman no nos mande basura
    * Ese secret guardarlo en algún repo de pendientes con datos necesarios del usuario
    * para poder después persistir el token que nos genera el finish en el usuario que corresponda
    * */
    override fun initNewAuth(): String {
        val secretState = "secret" + Random().nextInt(999999)
        val additionalParams: MutableMap<String, String> = HashMap<String, String>()
        additionalParams["access_type"] = "offline"
        additionalParams["prompt"] = "consent"

        return oAuth20Service.createAuthorizationUrlBuilder()
            .state(secretState)
            .additionalParams(additionalParams)
            .build()
    }

    override fun finishNewAuth(authorization: String): String = oAuth20Service
        .getAccessToken(authorization)
        .refreshToken
        .also {
            this.token = it
        }

    open fun getFile(fileId: String): Either<Throwable, FileDTO> = this.get(
        url = "https://www.googleapis.com/drive/v3/files/$fileId?fields=webContentLink,name,mimeType",
        ref = object : TypeReference<FileDTO>() {}
    )

    open fun createFile(name: String, file: MultipartFile, folderId: String): Either<Throwable, FileCreatedDTO> =
        createFile(metadata = MetadataDTO(name = name, parents = listOf(folderId)), file = file)

    open fun createFolder(folderName: String): Either<Throwable, FileCreatedDTO> {
        LOGGER.info("Creating folder $folderName")
        return createFile(
            metadata = MetadataDTO(name = folderName, mimeType = "application/vnd.google-apps.folder"),
            file = null
        )
    }

    private fun createFile(metadata: MetadataDTO, file: MultipartFile?): Either<Throwable, FileCreatedDTO> {
        val bodyParts = mutableListOf(
            Pair("application/json", objectMapper.writeValueAsBytes(metadata))
        )
        file?.let { bodyParts.add(Pair("multipart/form-data", it.bytes)) }

        return post(
            url = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
            ref = object : TypeReference<FileCreatedDTO>() {},
            bodyParts = *bodyParts.toTypedArray()
        )
    }

    open fun findOrCreateFolder(name: String): Either<Throwable, FileDTO> = query("name = '$name'")
        .flatMap {
            when (it.size) {
                0 -> createFolder(name).map { f -> f.toFile() }
                1 -> it.first().right()
                else -> AmbiguousReferenceException("More than one result found for $name").left()
            }
        }

    private fun query(query: String): Either<Throwable, List<FileDTO>> = this.get(
        url = "https://www.googleapis.com/drive/v3/files?q=${query.replaceUrlSpaces()}",
        ref = object : TypeReference<QueryDTO>() {}
    )
        .map { it.files }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(GoogleDriveOAuthClient::class.java)
    }
}