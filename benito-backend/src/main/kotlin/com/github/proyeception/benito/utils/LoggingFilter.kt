package com.github.proyeception.benito.utils

import com.github.proyeception.benito.extensions.prettyHeaders
import org.slf4j.LoggerFactory
import spark.Request
import spark.Response
import spark.Spark

object LoggingFilter {
    fun register() {
        Spark.before("/benito/*", this::before)
        Spark.after("/benito/*", this::after)
    }

    private fun before(req: Request, res: Response) {
        LOGGER.info("[REQUEST] -> ${req.requestMethod()}: ${req.pathInfo()}")
        LOGGER.info("Headers: [${req.prettyHeaders()}]")
        LOGGER.info("Body: [${req.body()}]")
    }

    private fun after(req: Request, res: Response) {
        LOGGER.info("[RESPONSE] -> Status: ${res.status()}")
        LOGGER.info("Headers: [${res.prettyHeaders()}]")
        LOGGER.info("Body: ${res.body()}")
    }

    private val LOGGER = LoggerFactory.getLogger(LoggingFilter::class.java)
}