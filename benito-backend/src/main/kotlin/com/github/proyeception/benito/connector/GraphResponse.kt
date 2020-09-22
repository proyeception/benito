package com.github.proyeception.benito.connector

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper

open class GraphResponse(
    private val body: String?,
    private val objectMapper: ObjectMapper
) {
    open fun <T> deserializeAs(ref: TypeReference<T>): T = objectMapper.readValue(body, ref)
}