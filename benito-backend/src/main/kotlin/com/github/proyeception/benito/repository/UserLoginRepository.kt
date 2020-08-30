package com.github.proyeception.benito.repository

import com.google.common.cache.Cache
import com.google.common.cache.CacheBuilder
import java.util.concurrent.TimeUnit


class UserLoginRepository(
    private val userIds: Cache<String, String> = CacheBuilder.newBuilder()
        .maximumSize(10000)
        .expireAfterWrite(10, TimeUnit.MINUTES)
        .build()
) {
    operator fun get(secret: String): String? = userIds.getIfPresent(secret)

    operator fun set(userId: String, secret: String) = userIds.put(userId, secret)
}