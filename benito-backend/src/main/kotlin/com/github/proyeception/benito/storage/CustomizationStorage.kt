package com.github.proyeception.benito.storage

import org.springframework.data.domain.Sort
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.aggregation.Aggregation.*
import org.springframework.data.mongodb.core.query.Criteria.where
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.Update.update
import org.springframework.data.mongodb.core.query.isEqualTo
import java.util.*

data class Tracking(
    val customizationToken: String,
    val userId: String? = null,
    val projectId: String,
    val date: Long = Date().time
)

data class Customization(
    val projectId: String,
    val views: Int
)

open class CustomizationStorage(
    private val mongoTemplate: MongoTemplate
) {
    open fun track(customizationToken: String, projectId: String) {
        mongoTemplate.save(
            Tracking(
                customizationToken = customizationToken,
                projectId = projectId
            )
        )
    }

    open fun customRecommendations(customizationToken: String): List<Customization> {
        val tracking = mongoTemplate
            .aggregate(
                newAggregation(
                    match(where("customizationToken").isEqualTo(customizationToken)),
                    sort(Sort.Direction.DESC, "date"),
                    group("projectId").count().`as`("views"),
                    limit(10),
                    sort(Sort.Direction.DESC, "views")
                ),
                "tracking",
                Map::class.java
            ).mappedResults

        return tracking.map {
            val views = it["views"] as Int
            val projectId = it["_id"] as String

            Customization(
                projectId = projectId,
                views = views
            )
        }
    }

    open fun setUserId(customizationToken: String, userId: String) {
        mongoTemplate.updateMulti(
            Query(where("customizationToken").isEqualTo(customizationToken)),
            update("userId", userId),
            Tracking::class.java
        )
    }
}