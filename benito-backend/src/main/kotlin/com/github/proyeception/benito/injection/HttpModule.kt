package com.github.proyeception.benito.injection

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.utils.IOResponseTransformer
import com.google.inject.AbstractModule
import com.google.inject.Provides
import com.google.inject.Singleton
import com.google.inject.name.Named

class HttpModule : AbstractModule() {
    @Provides
    @Singleton
    @Named("ioResponseTransformer")
    fun ioResponseTransformer(
        @Named("objectMapperSnakeCase") objectMapper: ObjectMapper
    ): IOResponseTransformer = IOResponseTransformer(objectMapper = objectMapper)
}