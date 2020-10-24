package com.github.proyeception.benito.storage

import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.aggregation.Aggregation.*
import org.springframework.data.mongodb.core.query.Criteria.where
import org.springframework.data.mongodb.core.query.isEqualTo

data class Drive(
    val projectId: String,
    val driveFolderId: String
)

open class DriveStorage(
    private val mongoTemplate: MongoTemplate
) {
    open fun findOne(projectId: String): Drive? = mongoTemplate
        .aggregate(
            newAggregation(
                match(where("_id").isEqualTo(projectId)),
                PROJECTION
            ),
            "projects",
            Drive::class.java
        )
        .mappedResults
        .firstOrNull()

    open fun findOpen(): List<Drive> = mongoTemplate
        .aggregate(
            newAggregation(
                match(where("open").isEqualTo(true)),
                PROJECTION
            ),
            "projects",
            Drive::class.java
        )
        .mappedResults

    companion object {
        private val PROJECTION = project()
            .and("_id").`as`("projectId")
            .and("drive_folder_id").`as`("driveFolderId")
    }
}
