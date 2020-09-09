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
    private val name: String,
    private val ref: TypeReference<List<T>>
) : InitializingBean, CoroutineScope {
    protected var elements = emptyList<T>()
    private val job: Job = Job()

    open fun findAll(): List<T> = elements

    open fun findAll(f: (T) -> Boolean): List<T> = elements.filter(f)

    open fun find(f: (T) -> Boolean): T? = elements.find(f)

    open fun count(): Int = elements.size

    fun refresh() {
        LOGGER.debug("Refreshing $name snapshot...")

        doRefresh()?.let { elements = it }

        LOGGER.debug("Refreshing for $name done. Will refresh again in $refreshRate seconds")
    }

    protected open fun doRefresh(): List<T>? {
        val response = connector.get(endpoint)

        return if (response.isError()) {
            LOGGER.warn("Error refreshing $name snapshot", response.body)
            null
        } else {
            response.deserializeAs(ref)
        }
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