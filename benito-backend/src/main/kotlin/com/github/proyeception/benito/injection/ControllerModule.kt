package com.github.proyeception.benito.injection

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.controller.BenitoController
import com.github.proyeception.benito.controller.ExceptionController
import com.github.proyeception.benito.service.SapiensService
import com.github.proyeception.benito.utils.IOResponseTransformer
import com.google.inject.AbstractModule
import com.google.inject.Provides
import com.google.inject.Singleton
import com.google.inject.name.Named

class ControllerModule : AbstractModule() {
    @Provides
    @Singleton
    @Named("exceptionController")
    fun exceptionController(
        @Named("objectMapperSnakeCase") objectMapper: ObjectMapper
    ): ExceptionController = ExceptionController(objectMapper)

    @Provides
    @Singleton
    @Named("benitoController")
    fun benitoController(
        @Named("ioResponseTransformer") ioResponseTransformer: IOResponseTransformer,
        @Named("objectMapperSnakeCase") objectMapper: ObjectMapper,
        @Named("sapiens") sapiensService: SapiensService
    ): BenitoController = BenitoController(
        ioResponseTransformer = ioResponseTransformer,
        objectMapper = objectMapper,
        sapiensService = sapiensService
    )
}