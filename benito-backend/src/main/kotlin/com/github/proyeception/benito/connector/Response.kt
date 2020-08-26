package com.github.proyeception.benito.connector

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.extension.isError

open class Response(
    open val headers: Map<String, String>,
    open val body: String?,
    open val status: Int,
    private val objectMapper: ObjectMapper
) {
    open fun isError(): Boolean = status.isError()

    open fun <T> deserializeAs(typeReference: TypeReference<T>?): T = objectMapper.readValue(body, typeReference)
}