package com.github.proyeception.benito.extensions

import spark.Request
import spark.Response

fun String.drop(s: String): String = this.drop(s.length)

fun Response.headers(): Map<String, String> {
    val headers = mutableMapOf<String, String>()
    for (header in this.raw().headerNames) {
        headers[header] = this.raw().getHeader(header)
    }

    return headers
}

fun Request.prettyHeaders(): String = this.headers().joinToString(",") { "$it: ${this.headers(it)}" }

fun Response.prettyHeaders(): String = this.headers()
    .map { (header, value) -> "$header: $value" }
    .joinToString(",")

fun <T> id(): (T) -> T = { it }