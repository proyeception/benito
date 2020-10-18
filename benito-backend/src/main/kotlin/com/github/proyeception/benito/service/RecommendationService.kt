package com.github.proyeception.benito.service

import arrow.core.getOrHandle
import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.client.MedusaGraphClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.exception.FailedDependencyException

open class RecommendationService(
    private val medusaClient: MedusaClient,
    private val medusaGraphClient: MedusaGraphClient
) {

    open fun recalculateRecommendations(
            projectId: String,
            originalRecommendations: List<RecommendationDTO>,
            keywords: List<KeywordDTO>) {

        val medusaProjectsRecommendations = obtainRecommendedProjects(keywords, projectId)

        val recommendations = obtainRecommendations(medusaProjectsRecommendations)

        updateProjectsRecommendedScore(projectId, originalRecommendations, keywords, recommendations)

        recommendations.forEach {
            val projectRecommendations = obtainRecommendedProjects(it.project_keywords, it.id)
            val recommendations = obtainRecommendations(projectRecommendations)
            updateProjectsRecommendedScore(it.id, it.original_recommendations, it.project_keywords, recommendations)
        }

    }

    private fun obtainRecommendations(medusaProjectsRecommendations: List<MedusaProjectDTO>): List<ProjectRecommendationDTO> {
        return medusaProjectsRecommendations
            .map {
                ProjectRecommendationDTO(
                    id = it.id,
                    project_keywords = it.project_keywords,
                    original_recommendations = it.recommendations.map { rec -> RecommendationDTO(rec) }
                )
            }
    }

    private fun obtainRecommendedProjects(keywords: List<KeywordDTO>, projectId: String): List<MedusaProjectDTO> {
        return medusaGraphClient.findProjects(projectKeywords = keywords.map { it.name })
            .getOrHandle { throw FailedDependencyException("Error getting projects from Medusa") }
            .filter { projectId != it.id }
    }

    private fun updateProjectsRecommendedScore(
            projectId: String,
            originalRecommendations: List<RecommendationDTO>,
            keywords: List<KeywordDTO>,
            recommendedProjects: List<ProjectRecommendationDTO>) {

        val recommendations: MutableList<CreateRecommendationDTO> = mutableListOf()

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


    public fun getAuthorRecommendations(authorId: String): List<ProjectDTO>{
        val user = medusaClient.findUser(authorId, UserType.AUTHOR)


        val p = medusaClient.findProjects().map{ProjectDTO(it)}
        return p
    }

    public fun getSupervisorRecommendations(authorId: String): List<ProjectDTO>{
        val user = medusaClient.findUser(authorId, UserType.SUPERVISOR)


        val p = medusaClient.findProjects().map{ProjectDTO(it)}
        return p
    }

    private fun mappingFromMedusa(f: () -> MedusaProjectDTO): ProjectDTO = ProjectDTO(f())

}