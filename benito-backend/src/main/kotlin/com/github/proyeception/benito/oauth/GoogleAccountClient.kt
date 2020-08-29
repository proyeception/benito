package com.github.proyeception.benito.oauth

import com.github.proyeception.benito.connector.OAuthConnector
import java.util.*

class GoogleAccountClient(
    private val googleAccountConnector: OAuthConnector
) : OAuthClient {

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

        return googleAccountConnector.oAuth20Service.createAuthorizationUrlBuilder()
            .state(secretState)
            .additionalParams(additionalParams)
            .build()
    }

    override fun finishNewAuth(authorization: String): String = googleAccountConnector.oAuth20Service
        .getAccessToken(authorization)
        .refreshToken
        .also {
            googleAccountConnector.token = it
        }
}