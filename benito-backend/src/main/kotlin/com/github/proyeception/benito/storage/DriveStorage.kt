package com.github.proyeception.benito.storage

import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.aggregation.Aggregation
import org.springframework.data.mongodb.core.aggregation.Aggregation.match
import org.springframework.data.mongodb.core.aggregation.Aggregation.project
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
            Aggregation.newAggregation(
                match(where("_id").isEqualTo(projectId)),
                PROJECTION
            ),
            "projects",
            Drive::class.java
        )
        .mappedResults
        .firstOrNull()

    open fun findAll(): List<Drive> = mongoTemplate
        .aggregate(
            Aggregation.newAggregation(PROJECTION),
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
