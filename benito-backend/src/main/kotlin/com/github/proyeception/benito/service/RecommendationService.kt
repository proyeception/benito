package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.mongodb.MongoTextSearch
import java.math.BigDecimal

open class RecommendationService(
        private val medusaClient: MedusaClient,
        private val mongoTextSearch: MongoTextSearch
) {

    open fun recalculateRecommendations(project: ProjectDTO) {

        val recommendedProjects = mongoTextSearch.findRecommendedProjects(project); //filtrarme a mi mismo
        updateProjectsRecommendedScore(project, recommendedProjects) //Guarda en la base junto con el score? o ordenarlos
/*
        recommendedProjects.forEach(recalculateRecommendations2())
        */
    }

    private fun updateProjectsRecommendedScore(updatedProject: ProjectDTO, recommendedProjects: List<ProjectRecommendationDTO>) {
        val updatedProjectKeywords = updatedProject.project_keywords

        val recommendations: MutableList<RecommendationDTO> = mutableListOf()

        recommendedProjects.forEach {
            val score: Double = calculateScore(it.project_keywords, updatedProjectKeywords)
            val updatedRecommendation = RecommendationDTO(
                    score = score,
                    projectId = it.id
            )
            recommendations.add(updatedRecommendation)
        }

        //Este SetRecommendationDTO en realidad lo tengo que mandar a que cree Recommendations individuales
        //en la collection Recommendations, tener el id y después agregarla al project en si
        //Ver como se hace en los documents
        medusaClient.updateRecommendations(
                updatedProject.id,
                SetRecommendationDTO(
                        recommendations = recommendations.toList()
                )
        )

    }

    private fun calculateScore(projectKeywords: List<KeywordDTO>, updatedProjectKeywords: List<KeywordDTO>): Double {
        val keywordNamesToCompare: List<String> = updatedProjectKeywords.map { it.name }
        return projectKeywords.filter { keywordNamesToCompare.contains(it.name) }.sumByDouble { it.score }
    }

}