package com.github.proyeception.benito.service

import com.github.proyeception.benito.dto.SessionInfoDTO

class SessionService {
    private val sessions: MutableMap<String, SessionInfoDTO> = mutableMapOf()

    operator fun set(token: String, info: SessionInfoDTO) {
        sessions[token] = info
    }

    operator fun get(token: String): SessionInfoDTO? = sessions[token]
}