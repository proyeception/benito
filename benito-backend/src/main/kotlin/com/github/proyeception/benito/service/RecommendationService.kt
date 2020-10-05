package com.github.proyeception.benito.service

import com.github.proyeception.benito.dto.ProjectDTO
import com.github.proyeception.benito.mongodb.MongoTextSearch
import org.springframework.scheduling.annotation.Async

open class RecommendationService(
    private val mongoTextSearch: MongoTextSearch
) {

    open fun recalculateRecommendations(project: ProjectDTO) {

        val recommendedProjects = mongoTextSearch.findRecommendedProjects(project); //filtrarme a mi mismo
/*
        updateProjectsRecommendedScore(medusaProject, recommendedProjects) //Guarda en la base junto con el score? o ordenarlos
        recommendedProjects.forEach(recalculateRecommendations2())
        */
    }
}