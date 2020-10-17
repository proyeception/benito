package com.github.proyeception.benito.storage

import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria.where
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.Update
import org.springframework.data.mongodb.core.query.isEqualTo

data class Tracking(
    val userId: String?,
    val token: String,
    val projects: List<String>
)

class CustomizationStorage(
    private val mongoTemplate: MongoTemplate
) {
    fun update(token: String, projects: List<String>) {
        mongoTemplate.updateFirst(
            Query.query(where("token").isEqualTo(token)),
            Update.update("projects", projects),
            Any::class.java
        )
    }

//    fun save(t: Tracking)
}