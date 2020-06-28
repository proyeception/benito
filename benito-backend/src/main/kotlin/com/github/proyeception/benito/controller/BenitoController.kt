package com.github.proyeception.benito.controller

import arrow.fx.IO
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.service.SapiensService
import com.github.proyeception.benito.utils.IOResponseTransformer
import spark.Request
import spark.Response
import spark.Spark

class BenitoController(
    private val ioResponseTransformer: IOResponseTransformer,
    private val objectMapper: ObjectMapper,
    private val sapiensService: SapiensService
) : Controller {
    override fun register() {
        Spark.post("/benito/login", "application/json", this::login, ioResponseTransformer::render)
    }

    fun login(req: Request, res: Response): IO<Unit> = TODO()
}