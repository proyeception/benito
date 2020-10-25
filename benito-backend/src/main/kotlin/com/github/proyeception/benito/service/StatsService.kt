package com.github.proyeception.benito.service

import arrow.core.extensions.list.monad.flatMap
import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.storage.StatsStorage

open class StatsService(
    private val statsStorage: StatsStorage,
    private val medusaClient: MedusaClient
) {

    fun findAll(): List<ProjectVisitDTO> = statsStorage
        .findAll()

    fun registerVisit(projectVisitDTO: ProjectVisitDTO) = statsStorage.insert(projectVisitDTO)

    fun projectsXorganization(categoryId: String?): List<OrganizationQuantityDTO> {
        val projects = medusaClient.findProjects()
        val result = projects.filter{it.category.id == categoryId || categoryId.isNullOrBlank()}
                    .groupingBy { it.organization.displayName }
                    .eachCount()
                    .map{OrganizationQuantityDTO(it.key, it.value)}
        return result
    }

    fun projectsXyearWcategory(categoryIds: List<String>?): List<ProjectCreationTimelineDTO> {
        val projects = medusaClient.findProjects()

        var years = listOf<Int>()
        if(categoryIds.isNullOrEmpty()){
            val minYear = projects.map { it.creationDate.year }.distinct().min()
            val maxYear = projects.map { it.creationDate.year }.distinct().max()

        } else {
            years = projects.filter { categoryIds!!.contains(it.category.id) }
                .map { it.creationDate.year }.distinct()
        }

        var result = categoryIds!!.map {
            val categoryId = it;
            val a = ProjectCreationTimelineDTO(categoryId, projects.filter { it.category.id == categoryId }
                .groupingBy { it.creationDate.year }
                .eachCount()
                .map { ProjectYearsDTO(it.key, it.value) }
                .sortedBy { it.year }
                 );
            println(it)
            a
        }

        for (year in years) {
            for (category in result) {
                val categoryYears = category.quantities.map {it.year}
                if(!categoryYears.contains(year)){
                    category.quantities += (ProjectYearsDTO(year, 0))
                }
            }
        }

        println(result)

        return result
    }
}
