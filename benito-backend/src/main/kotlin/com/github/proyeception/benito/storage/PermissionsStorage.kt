package com.github.proyeception.benito.storage

import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria.where
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.isEqualTo

data class Permission(
    val userId: String,
    val permissionId: String,
    val fileId: String
)

open class PermissionsStorage(
    private val mongoTemplate: MongoTemplate
) {
    open fun save(userId: String, permissionId: String, fileId: String) {
        mongoTemplate.save(Permission(userId = userId, permissionId = permissionId, fileId = fileId))
    }

    open fun findPermissionsForFile(fileId: String): List<Permission> = mongoTemplate
        .find(Query(where("fileId").isEqualTo(fileId)), Permission::class.java)
}