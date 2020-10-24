package com.github.proyeception.benito.extension

fun <T> List<T>.splitBy(f: (T) -> Boolean): Pair<List<T>, List<T>> {
    val match = mutableListOf<T>()
    val noMatch = mutableListOf<T>()

    this.forEach { (if (f(it)) match else noMatch).add(it) }

    return match to noMatch
}