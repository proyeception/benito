package com.github.proyeception.benito.connector

class Response(
    val headers: Map<String, String>,
    val body: String?,
    val status: Int
) {
    fun isError(): Boolean = status in 400..599
}