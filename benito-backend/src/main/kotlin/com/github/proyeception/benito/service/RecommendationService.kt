package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.storage.RecommendationStorage
import org.slf4j.LoggerFactory

open class RecommendationService(
    private val medusaClient: MedusaClient,
    private val recommendationStorage: RecommendationStorage
) {

    open fun recalculateRecommendations(
            projectId: String,
            originalRecommendations: List<RecommendationDTO>,
            keywords: List<KeywordDTO>) {

        val recommendations = obtainRecommendedProjects(keywords, projectId)

        LOGGER.info("Obtained recommendations: $recommendations for project: $projectId")

        updateProjectsRecommendedScore(projectId, originalRecommendations, keywords, recommendations)

        LOGGER.info("Updating recently recommended Projects")

        recommendations.forEach {
            val projectRecommendations = obtainRecommendedProjects(it.project_keywords, it.id)
            updateProjectsRecommendedScore(it.id, it.recommendations, it.project_keywords, projectRecommendations)
        }

    }

    private fun obtainRecommendedProjects(
        keywords: List<KeywordDTO>,
        projectId: String
    ): List<ProjectRecommendationDTO> = recommendationStorage
        .findProjectRecommendationsWithKeyword(keywords).filterNot { it.id == projectId }

    private fun updateProjectsRecommendedScore(
        projectId: String,
        originalRecommendations: List<RecommendationDTO>,
        keywords: List<KeywordDTO>,
        recommendedProjects: List<ProjectRecommendationDTO>
    ) {
        val recommendations: MutableList<CreateRecommendationDTO> = mutableListOf()

        LOGGER.info("Creating Recommendations for project: $projectId")

        recommendedProjects.forEach {
            val score: Double = calculateScore(it.project_keywords, keywords)
            val updatedRecommendation = CreateRecommendationDTO(
                score = score,
                projectId = it.id
            )
            recommendations.add(updatedRecommendation)
        }

        medusaClient.updateRecommendations(
            recommendations,
            projectId,
            originalRecommendations
        )
    }

    private fun calculateScore(projectKeywords: List<KeywordDTO>, updatedProjectKeywords: List<KeywordDTO>): Double {
        val keywordNamesToCompare: List<String> = updatedProjectKeywords.map { it.name }
        return projectKeywords.filter { keywordNamesToCompare.contains(it.name) }.sumByDouble { it.score }
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(RecommendationService::class.java)
    }
}