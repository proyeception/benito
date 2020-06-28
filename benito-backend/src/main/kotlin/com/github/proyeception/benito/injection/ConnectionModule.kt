package com.github.proyeception.benito.injection

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.connector.Connector
import com.google.inject.AbstractModule
import com.google.inject.Provides
import com.google.inject.Singleton
import com.google.inject.name.Named
import com.typesafe.config.Config
import org.apache.http.impl.client.HttpClientBuilder

class ConnectionModule : AbstractModule() {
    @Provides
    @Singleton
    @Named("sapiensConnector")
    fun sapiensConnector(
        @Named("objectMapperSnakeCase") objectMapper: ObjectMapper,
        config: Config
    ): Connector = Connector(
        host = config.getString("sapiens.host"),
        objectMapper = objectMapper,
        apacheClient = HttpClientBuilder.create().build()
    )
}