package com.github.proyeception.benito.storage

import com.github.proyeception.benito.dto.KeywordDTO
import com.github.proyeception.benito.dto.ProjectRecommendationDTO
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.aggregation.Aggregation
import org.springframework.data.mongodb.core.aggregation.LookupOperation
import org.springframework.data.mongodb.core.query.Criteria.where

class RecommendationStorage(
    private val mongoTemplate: MongoTemplate
) {
    fun findProjectRecommendationsWithKeyword(keywords: List<KeywordDTO>): List<ProjectRecommendationDTO> {
        val keywordLookup = LookupOperation.newLookup()
            .from("keywords")
            .localField("project_keywords")
            .foreignField("_id")
            .`as`("project_keywords")

        val recommendationLookup = LookupOperation.newLookup()
            .from("recommendations")
            .localField("recommendations")
            .foreignField("_id")
            .`as`("recommendations")

        val match = Aggregation.match(
            where("project_keywords").elemMatch(where("name").`in`(keywords.map { it.name }))
        )

        val aggregate = Aggregation.newAggregation(keywordLookup, recommendationLookup, match)
        return mongoTemplate.aggregate(aggregate, "projects", ProjectRecommendationDTO::class.java)
            .mappedResults
    }
}