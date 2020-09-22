package com.github.proyeception.benito.connector

import arrow.core.Either
import arrow.core.left
import arrow.core.right
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.exception.GraphQueryException
import klient.graphql.GraphQLClient
import klient.graphql.GraphQLRequest

open class GraphConnector(
    private val klient: GraphQLClient,
    private val objectMapper: ObjectMapper
) {
    open fun execute(query: String): Either<Throwable, GraphResponse> {
        val request = GraphQLRequest(query)

        val response = klient.performRequest<String>(request)

        if (response.hasErrors) {
            return GraphQueryException(response.errors.map { it.message }).left()
        }

        return GraphResponse(
            body = response.data,
            objectMapper = objectMapper
        ).right()
    }
}