package com.github.proyeception.benito.service

import com.github.proyeception.benito.utils.HashUtil

open class SessionService(
    private val hashUtil: HashUtil
) {
    open fun createSessionToken(userId: String): String = hashUtil.expiringHash(userId)
}