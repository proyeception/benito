package com.github.proyeception.benito.injection

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.core.Version
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.PropertyNamingStrategy
import com.fasterxml.jackson.databind.module.SimpleModule
import com.fasterxml.jackson.datatype.joda.JodaModule
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.afterburner.AfterburnerModule
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.google.inject.AbstractModule
import com.google.inject.Provides
import com.google.inject.Singleton
import com.google.inject.name.Named

class ObjectMapperModule : AbstractModule() {
    @Provides
    @Singleton
    @Named("objectMapperSnakeCase")
    fun objectMapper(): ObjectMapper {
        val objectMapper = jacksonObjectMapper()
        objectMapper.registerModule(AfterburnerModule())
        objectMapper.registerModule(KotlinModule())
        objectMapper.registerModule(JavaTimeModule())
        objectMapper.registerModule(JodaModule())
        objectMapper.registerModule(this.getModule())
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
        objectMapper.propertyNamingStrategy = PropertyNamingStrategy.SNAKE_CASE
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL)

        return objectMapper
    }

    private fun getModule(): SimpleModule {
        return SimpleModule("DefaultModule", Version(0, 0, 1, null, null, null))
    }
}