package com.github.proyeception.benito.connector

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper

open class GraphResponse(
    val body: Map<String, Any>?,
    private val objectMapper: ObjectMapper
) {
    open fun <T> deserializeAs(ref: TypeReference<T>): T = objectMapper.convertValue(body, ref)
}