package com.github.proyeception.benito.connector

sealed class OAuthRequestBody

data class JsonBody(
    val body: Any
) : OAuthRequestBody()

data class MultipartBody(
    val parts: List<Pair<String, ByteArray>>
) : OAuthRequestBody() {
    constructor(vararg parts: Pair<String, ByteArray>) : this(parts = parts.toList())
}
