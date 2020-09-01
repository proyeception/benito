package com.github.proyeception.benito.service

import com.github.proyeception.benito.dto.SessionInfoDTO

open class SessionService {
    private val sessions: MutableMap<String, SessionInfoDTO> = mutableMapOf()

    open operator fun set(token: String, info: SessionInfoDTO) {
        sessions[token] = info
    }

    open operator fun get(token: String): SessionInfoDTO? = sessions[token]

    open fun delete(token: String) {
        sessions.remove(token)
    }
}