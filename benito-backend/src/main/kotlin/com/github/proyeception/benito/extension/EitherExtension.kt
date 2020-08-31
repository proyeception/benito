package com.github.proyeception.benito.extension

import arrow.core.Either
import arrow.core.getOrHandle

fun <A> Either<Throwable, A>.getOrThrow(): A = getOrThrow { it }

fun <A, B> Either<Throwable, A>.getOrThrow(f: (A) -> B): B = this.fold(
    ifLeft = { throw it },
    ifRight = { f(it) }
)