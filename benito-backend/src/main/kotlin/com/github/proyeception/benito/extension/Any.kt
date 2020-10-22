package com.github.proyeception.benito.extension

import kotlinx.coroutines.*

fun <T> T.asyncAlso(f: (T) -> Unit) = this.also {
    GlobalScope.launch {
        f(this@asyncAlso)
    }
}

fun <T> CoroutineScope.asyncIO(block: suspend CoroutineScope.() -> T): Deferred<T> = async(
    context = Dispatchers.IO,
    block = block
)
