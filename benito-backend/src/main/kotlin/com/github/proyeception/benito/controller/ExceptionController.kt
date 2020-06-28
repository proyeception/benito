package com.github.proyeception.benito.controller

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.dto.ErrorDTO
import com.github.proyeception.benito.exception.HttpException
import org.slf4j.LoggerFactory
import spark.Spark

class ExceptionController(
    private val objectMapper: ObjectMapper
) : Controller {
    override fun register() {
        Spark.exception(Exception::class.java) { e, req, res ->
            LOGGER.error("Error at ${req.pathInfo()}", e)
            val status = when (e) {
                is HttpException -> e.status
                else -> 500
            }
            val body = objectMapper.writeValueAsString(ErrorDTO(status, e.message))
            res.body(body)
            res.status(status)
            res.header("content-type", "application/json; charset=utf-8")
        }
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(ExceptionController::class.java)
    }
}