package com.github.proyeception.benito.oauth

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.dto.FileDTO
import com.github.proyeception.benito.extension.getOrThrow
import com.github.scribejava.apis.GoogleApi20
import com.github.scribejava.core.model.OAuth2AccessToken
import java.util.*

class GoogleDriveOAuthClient(
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

    override fun finishNewAuth(authorization: String): String {
        val accessToken: OAuth2AccessToken = oAuth20Service.getAccessToken(authorization)
        this.token = accessToken.refreshToken
        return token
    }

    fun getFile(fileId: String): String {
        val response = get(
            "https://www.googleapis.com/drive/v3/files/$fileId?fields=webContentLink",
            object : TypeReference<FileDTO>() {}
        )

        return response
            .map { it.webContentLink ?: "https://" }
            .getOrThrow()
    }
}