package com.github.proyeception.benito.connector

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper

open class GraphResponse(
    val body: Map<String, Any>?,
    private val objectMapper: ObjectMapper
) {
    open fun map(f: (Map<String, Any>) -> Map<String, Any>?): GraphResponse = copy(
        body = body?.let(f)
    )

    open fun <T> deserializeAs(ref: TypeReference<T>): T = objectMapper.convertValue(body, ref)

    fun copy(
        objectMapper: ObjectMapper = this.objectMapper,
        body: Map<String, Any>? = this.body
    ): GraphResponse = GraphResponse(
        objectMapper = objectMapper,
        body = body
    )
}