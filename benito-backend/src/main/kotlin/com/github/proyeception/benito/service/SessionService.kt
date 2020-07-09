package com.github.proyeception.benito.service

import com.github.proyeception.benito.utils.HashUtil

open class SessionService(
    private val hashUtil: HashUtil
) {
    fun createSessionToken(userId: String): String = hashUtil.hashAndSalt(userId)
}