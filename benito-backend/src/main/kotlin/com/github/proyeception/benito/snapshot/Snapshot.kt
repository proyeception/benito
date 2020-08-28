package com.github.proyeception.benito.snapshot

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.Connector
import kotlinx.coroutines.*
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.InitializingBean
import kotlin.coroutines.CoroutineContext

abstract class Snapshot<T>(
    private val refreshRate: Int,
    private val endpoint: String,
    private val connector: Connector
) : InitializingBean, CoroutineScope {
    private var elements = emptyList<T>()
    private val job: Job = Job()

    private fun refresh() {
        val response = connector.get(endpoint)

        if (response.isError()) {
            LOGGER.error("Error refreshing snapshot", response.body)
        }

        elements = response.deserializeAs(object : TypeReference<List<T>>() {})
    }

    override fun afterPropertiesSet() {
        launch {
            while (true) {
                refresh()
                delay(refreshRate.toLong())
            }
        }
    }

    override val coroutineContext: CoroutineContext
        get() = Dispatchers.Default + job

    companion object {
        private val LOGGER = LoggerFactory.getLogger(Snapshot::class.java)
    }
}