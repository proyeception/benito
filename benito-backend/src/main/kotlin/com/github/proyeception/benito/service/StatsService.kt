package com.github.proyeception.benito.service

import arrow.core.extensions.list.monad.flatMap
import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.storage.StatsStorage

open class StatsService(
    private val statsStorage: StatsStorage,
    private val medusaClient: MedusaClient,
    private val categoriesService: CategoriesService
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

        var years: IntRange
        var minYear: Int? = 0
        var maxYear: Int? = 0
        if(categoryIds.isNullOrEmpty()){
            println("is null!!")
            minYear = projects.map { it.creationDate.year }.distinct().min()
            maxYear = projects.map { it.creationDate.year }.distinct().max()
            if(minYear == maxYear){
                minYear = minYear!! - 1
            }
        } else {
            minYear  = projects.filter { categoryIds!!.contains(it.category.id) }
                                    .map { it.creationDate.year }.distinct()
                                    .min()
            maxYear  = projects.filter { categoryIds!!.contains(it.category.id) }
                                    .map { it.creationDate.year }.distinct()
                                    .max()
        }
        years = IntRange(minYear!!, maxYear!!)
        val allCategories = categoriesService.categories()

        var categories = listOf<String>()
        if(categoryIds.isNullOrEmpty()){
            categories = projects.map { it.category.id }.distinct()
        } else { categories = categoryIds }

        var result = categories.map {
            val categoryId = it;
            ProjectCreationTimelineDTO(categoryId, projects.filter { it.category.id == categoryId }
                .groupingBy { it.creationDate.year }
                .eachCount()
                .map { ProjectYearsDTO(it.key, it.value) }
                .sortedBy { it.year }
                 )
        }.map{
            val c = it.category
            ProjectCreationTimelineDTO(allCategories
                .find{it.id == c}!!.name, it.quantities)}.take(10)

        for (year in years) {
            for (category in result) {
                val categoryYears = category.quantities.map {it.year}
                if(!categoryYears.contains(year)){
                    category.quantities += (ProjectYearsDTO(year, 0))
                }
            }
        }

        return result
    }
}
