package com.github.proyeception.benito.extension

fun String.replaceUrlSpaces(): String = this.replace(" ", "+")

fun String.fromCamelToKebab(): String = this.fold("") { acc, c ->
    acc + when (c) {
        in 'A'..'Z' -> if (c in 'A'..'Z') {
            if (acc.isEmpty() || acc.endsWith("-")) c.toLowerCase() else "-" + c.toLowerCase()
        } else c
        ' ' -> '-'
        else -> c
    }

}
