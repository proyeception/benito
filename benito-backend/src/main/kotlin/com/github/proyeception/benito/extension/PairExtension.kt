package com.github.proyeception.benito.extension

fun <A, B, C> Pair<Pair<A, B>, C>.flatten(): Triple<A, B, C> = Triple(
    first = this.first.first,
    second = this.first.second,
    third = this.second
)