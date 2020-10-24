package com.github.proyeception.benito.extension

fun <A, B, C> Pair<A, B>.mapFirst(f: (A) -> C): Pair<C, B> = f(this.first) to this.second
