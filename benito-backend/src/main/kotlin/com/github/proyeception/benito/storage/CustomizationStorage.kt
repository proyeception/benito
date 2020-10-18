package com.github.proyeception.benito.storage

import org.springframework.data.domain.Sort
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.aggregation.Aggregation
import org.springframework.data.mongodb.core.query.Criteria.where
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.Update
import org.springframework.data.mongodb.core.query.isEqualTo
import java.util.*

data class Tracking(
    val customizationToken: String,
    val userId: String? = null,
    val projectId: String,
    val date: Date = Date()
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
                Aggregation.newAggregation(
                    Aggregation.match(where("customizationToken").isEqualTo(customizationToken)),
                    Aggregation.group("projectId").count().`as`("views"),
                    Aggregation.sort(Sort.Direction.DESC, "date"),
                    Aggregation.limit(10),
                    Aggregation.sort(Sort.Direction.DESC, "views")
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
            Update.update("userId", userId),
            Any::class.java
        )
    }
}