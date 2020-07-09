package com.github.proyeception.benito.utils

class HashUtil {
    //TODO: actually implement the hashing before going to prod
    fun hashAndSalt(s: String): String = s

    // This one is _not_ deterministic. Instead, it will depend on the date on which it s executed (only year, month
    // and day)
    fun expiringHash(s: String): String = s
}