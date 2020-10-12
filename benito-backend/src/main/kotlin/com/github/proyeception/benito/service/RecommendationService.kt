package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.mongodb.MongoTextSearch

open class RecommendationService(
        private val medusaClient: MedusaClient,
        private val mongoTextSearch: MongoTextSearch
) {

    open fun recalculateRecommendations(project: ProjectDTO) {

        val recommendedProjects = mongoTextSearch.findRecommendedProjects(project); //filtrarme a mi mismo
        updateProjectsRecommendedScore(project, recommendedProjects)
/*
        recommendedProjects.forEach(recalculateRecommendations2()) recalcular a 1 nivel de profundidad
*/
    }

    private fun updateProjectsRecommendedScore(updatedProject: ProjectDTO, recommendedProjects: List<ProjectRecommendationDTO>) {
        val updatedProjectKeywords = updatedProject.project_keywords

        val recommendations: MutableList<CreateRecommendationDTO> = mutableListOf()

        recommendedProjects.forEach {
            val score: Double = calculateScore(it.project_keywords, updatedProjectKeywords)
            val updatedRecommendation = CreateRecommendationDTO(
                    score = score,
                    projectId = it.id
            )
            recommendations.add(updatedRecommendation)
        }

        medusaClient.updateRecommendations(
                recommendations,
                updatedProject
        )

    }

    private fun calculateScore(projectKeywords: List<KeywordDTO>, updatedProjectKeywords: List<KeywordDTO>): Double {
        val keywordNamesToCompare: List<String> = updatedProjectKeywords.map { it.name }
        return projectKeywords.filter { keywordNamesToCompare.contains(it.name) }.sumByDouble { it.score }
    }

}