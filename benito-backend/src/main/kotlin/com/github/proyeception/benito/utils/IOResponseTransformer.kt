package com.github.proyeception.benito.utils

import arrow.fx.IO
import com.fasterxml.jackson.databind.ObjectMapper
import spark.ResponseTransformer

open class IOResponseTransformer(
    private val objectMapper: ObjectMapper
) : ResponseTransformer {
    override fun render(model: Any?): String = when (model) {
        is IO<Any?> -> model.unsafeRunSync().let { objectMapper.writeValueAsString(it) }
        else -> objectMapper.writeValueAsString(model)
    }
}