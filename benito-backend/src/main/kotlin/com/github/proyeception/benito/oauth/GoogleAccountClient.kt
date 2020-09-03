package com.github.proyeception.benito.oauth

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.DynamicOAuthConnector
import com.github.proyeception.benito.dto.GoogleProfileDTO
import com.github.proyeception.benito.extension.getOrThrow
import java.util.*

open class GoogleAccountClient(
    private val googleAccountConnector: DynamicOAuthConnector
) : OAuthClient {

    /*
    * Queda pendiente el terminar de crear nuevos usuarios
    * Habría que validar con el secret que un forro con postman no nos mande basura
    * Ese secret guardarlo en algún repo de pendientes con datos necesarios del usuario
    * para poder después persistir el token que nos genera el finish en el usuario que corresponda
    * */
    override fun initNewAuth(): Pair<String, String> {
        val secretState = "secret" + Random().nextInt(999999)
        val additionalParams: MutableMap<String, String> = mutableMapOf(
            "access_type" to "offline",
            "prompt" to "consent"
        )

        return Pair(
            first = secretState,
            second = googleAccountConnector.createAuthorizationUrl(secretState, additionalParams)
        )
    }

    override fun finishNewAuth(authorization: String): String = googleAccountConnector
        .accessToken(authorization)
        .refreshToken

    // TODO: find an endpoint that gives more user info, if possible
    open fun userInfo(token: String) = googleAccountConnector
        .get("https://people.googleapis.com/v1/people/me?personFields=metadata,names,emailAddresses,photos", token)
        .getOrThrow { it.deserializeAs(object : TypeReference<GoogleProfileDTO>() {}) }
}