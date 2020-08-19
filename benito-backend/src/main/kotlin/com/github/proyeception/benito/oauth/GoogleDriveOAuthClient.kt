package com.github.proyeception.benito.oauth

import com.github.scribejava.apis.GoogleApi20
import com.github.scribejava.core.model.OAuth2AccessToken
import com.github.scribejava.core.oauth.OAuth20Service
import java.util.*

class GoogleDriveOAuthClient(oAuth20Service: OAuth20Service, token: String) : OAuthClient(GoogleApi20.instance(), "https://www.googleapis.com/auth/drive", "CLIENT_ID", "CLIENT_SECRET", "RUTA AL OUATH CONTROLLER", oAuth20Service, token) {

    /*
    * Queda pendiente el terminar de crear nuevos usuarios
    * Habría que validar con el secret que un forro con postman no nos mande basura
    * Ese secret guardarlo en algún repo de pendientes con datos necesarios del usuario
    * para poder después persistir el token que nos genera el finish en el usuario que corresponda
    * */
    override fun initNewAuth():String {
        val secretState = "secret" + Random().nextInt(999999)
        val additionalParams: MutableMap<String, String> = HashMap<String, String>()
        additionalParams["access_type"] = "offline"
        additionalParams["prompt"] = "consent"
        val authorizationUrl = oAuth20Service.createAuthorizationUrlBuilder()
                .state(secretState)
                .additionalParams(additionalParams)
                .build()
        return authorizationUrl
    }

    override fun finishNewAuth(authorization: String): String {
        var accessToken: OAuth2AccessToken = oAuth20Service.getAccessToken(authorization)
        this.token = accessToken.refreshToken
        return token
    }

    public fun getFile(fileId:String):String{
        return this.get("https://www.googleapis.com/drive/v3/files/$fileId?fields=webContentLink").body
    }

}