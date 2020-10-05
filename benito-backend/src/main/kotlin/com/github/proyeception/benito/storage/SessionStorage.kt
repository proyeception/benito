package com.github.proyeception.benito.storage

import com.github.proyeception.benito.dto.RoleDTO
import com.github.proyeception.benito.dto.SessionInfoDTO
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria.where
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.isEqualTo

data class Session(
    val role: RoleDTO,
    val userId: String,
    val key: String
) {
    constructor(key: String, info: SessionInfoDTO) : this(
        role = info.role,
        userId = info.userId,
        key = key
    )

    fun toDTO(): SessionInfoDTO = SessionInfoDTO(role = role, userId = userId)
}

class SessionStorage(
    private val mongoTemplate: MongoTemplate
) {

    fun find(key: String): Session? = mongoTemplate.findOne(
        Query((where("key").isEqualTo(key))),
        CLASS
    )

    fun save(session: Session) {
        mongoTemplate.save(session)
    }

    fun delete(key: String) {
        mongoTemplate.remove(
            Query(where("key").isEqualTo(key))
        )
    }

    companion object {
        private val CLASS = Session::class.java
    }
}