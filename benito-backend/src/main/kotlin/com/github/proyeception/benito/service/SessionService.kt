package com.github.proyeception.benito.service

import com.github.proyeception.benito.dto.SessionInfoDTO
import com.github.proyeception.benito.storage.Session
import com.github.proyeception.benito.storage.SessionStorage

open class SessionService(
    private val sessionStorage: SessionStorage
) {
    open operator fun set(token: String, info: SessionInfoDTO) {
        sessionStorage.save(Session(token, info))
    }

    open operator fun get(token: String): SessionInfoDTO? = sessionStorage.find(token)?.toDTO()

    open fun delete(token: String) = sessionStorage.delete(token)
}