package com.github.proyeception.benito.service

import com.github.proyeception.benito.dto.KeywordDTO
import com.github.proyeception.benito.dto.ProjectDTO
import com.github.proyeception.benito.dto.ProjectRecommendationDTO
import com.github.proyeception.benito.dto.RecommendationDTO
import com.github.proyeception.benito.mongodb.MongoTextSearch
import java.math.BigDecimal

open class RecommendationService(
    private val mongoTextSearch: MongoTextSearch
) {

    open fun recalculateRecommendations(project: ProjectDTO) {
/*

        val recommendedProjects = mongoTextSearch.findRecommendedProjects(project); //filtrarme a mi mismo
        updateProjectsRecommendedScore(project, recommendedProjects) //Guarda en la base junto con el score? o ordenarlos
        recommendedProjects.forEach(recalculateRecommendations2())
        */
    }

    private fun updateProjectsRecommendedScore(updatedProject: ProjectDTO, recommendedProjects: List<ProjectRecommendationDTO>) {
        val updatedProjectKeywords = updatedProject.project_keywords

        val recommendations: MutableList<RecommendationDTO> = mutableListOf()

        recommendedProjects.forEach {
            val score: BigDecimal = calculateScore(it.project_keywords, updatedProjectKeywords)
            val updatedRecommendation = RecommendationDTO(
                    score = score,
                    projectId = it.id
            )
            recommendations.add(updatedRecommendation)
        }

        updatedProject.recommendations = recommendations.toList()
    }

    private fun calculateScore(projectKeywords: List<KeywordDTO>, updatedProjectKeywords: List<KeywordDTO>): BigDecimal {
        TODO("Not yet implemented")
    }

}