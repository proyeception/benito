package com.github.proyeception.benito.service

import com.github.proyeception.benito.dto.SessionInfoDTO
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.ConcurrentMap

open class SessionService {
    private val sessions: ConcurrentMap<String, SessionInfoDTO> = ConcurrentHashMap()

    open operator fun set(token: String, info: SessionInfoDTO) {
        sessions[token] = info
    }

    open operator fun get(token: String): SessionInfoDTO? = sessions[token]

    open fun delete(token: String) {
        sessions.remove(token)
    }
}