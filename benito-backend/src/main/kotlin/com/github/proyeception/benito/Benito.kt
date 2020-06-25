package com.github.proyeception.benito

import com.github.proyeception.benito.utils.LoggingFilter
import org.eclipse.jetty.server.Server
import org.eclipse.jetty.servlet.FilterHolder
import org.eclipse.jetty.servlet.ServletContextHandler
import org.slf4j.LoggerFactory
import spark.servlet.SparkApplication
import spark.servlet.SparkFilter
import kotlin.system.exitProcess

class Benito {
    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            Benito().run(args)
        }

        private const val CONTEXT_PATH = "/"
        private val LOGGER = LoggerFactory.getLogger(Benito::class.java)
    }

    fun run(args: Array<String>) {
        LOGGER.info("Args passed: ${args.joinToString(", ")}")
        val port = 9290
        LOGGER.info("Using port $port.")

        val handler = ServletContextHandler()
        handler.contextPath = CONTEXT_PATH

        listOf(
            object : FilterHolder(SparkFilter()) {
                init {
                    this.setInitParameter("applicationClass", App::class.java.name)
                }
            }
        ).forEach { handler.addFilter(it, "*", null) }

        try {
            val server = Server(port)
            server.handler = handler
            server.start()
            server.join()
        } catch (e: Exception) {
            LOGGER.error("Error starting the application", e)
            exitProcess(-1)
        }
    }

    class App : SparkApplication {
        override fun init() {
            LoggingFilter.register()
        }
    }
}