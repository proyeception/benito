package com.github.proyeception.benito.snapshot

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.Connector
import kotlinx.coroutines.*
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.InitializingBean
import kotlin.coroutines.CoroutineContext

abstract class Snapshot<T>(
    private val refreshRate: Int, // in seconds
    private val endpoint: String,
    private val connector: Connector,
    private val name: String
) : InitializingBean, CoroutineScope {
    protected var elements = emptyList<T>()
    private val job: Job = Job()

    init {

    }

    fun refresh() {
        LOGGER.info("Refreshing $name snapshot...")
        val response = connector.get(endpoint)

        if (response.isError()) {
            LOGGER.error("Error refreshing $name snapshot", response.body)
        } else {
            elements = response.deserializeAs(object : TypeReference<List<T>>() {})
        }

        LOGGER.info("Refreshing for $name done. Will refresh again in $refreshRate seconds")
    }

    override fun afterPropertiesSet() {
        launch {
            while (true) {
                refresh()
                delay(refreshRate.toLong() * 1000)
            }
        }
    }

    override val coroutineContext: CoroutineContext
        get() = Dispatchers.Default + job

    companion object {
        private val LOGGER = LoggerFactory.getLogger(Snapshot::class.java)
    }
}