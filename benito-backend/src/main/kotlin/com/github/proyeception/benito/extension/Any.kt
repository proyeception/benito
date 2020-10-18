package com.github.proyeception.benito.extension

import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

fun <T> T.asyncAlso(f: (T) -> Unit) = this.also {
    GlobalScope.launch {
        f(this@asyncAlso)
    }
}