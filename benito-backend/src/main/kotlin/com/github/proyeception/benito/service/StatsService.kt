package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.storage.StatsStorage

open class StatsService(
    private val statsStorage: StatsStorage,
    private val medusaClient: MedusaClient,
    private val categoriesService: CategoriesService
) {

    open fun findAll(): List<ProjectVisitDTO> = statsStorage.findAll()

    open fun registerVisit(projectVisitDTO: ProjectVisitDTO) = statsStorage.insert(projectVisitDTO)

    open fun projectsXorganization(categoryId: String?): List<OrganizationQuantityDTO> {
        val projects = medusaClient.findProjects()
        val allOrganizations = projects.filter { it.category.id == categoryId || categoryId.isNullOrBlank() }
            .groupingBy { it.organization.displayName }
            .eachCount()
            .map { OrganizationQuantityDTO(it.key, it.value) }
            .sortedByDescending{ it.quantity }

        val maxElements = 5
        var result = allOrganizations
        if (allOrganizations.size > maxElements){
            result = allOrganizations.slice(0 until maxElements).toMutableList()
            val size = allOrganizations.size
            val others = allOrganizations.slice(maxElements until size)
            val otherElement = OrganizationQuantityDTO("Otros", others.map { it.quantity }.sum())
            result.add(otherElement)
        }

        return result

    }

    fun projectsXcategory(organizationId: String?): List<CategoryQuantityDTO> {
        val projects = medusaClient.findProjects()
        val allCategories = projects.filter {it.organization.id == organizationId || organizationId.isNullOrBlank()}
            .groupingBy { it.category.name }
            .eachCount()
            .map {CategoryQuantityDTO(it.key, it.value) }
            .sortedByDescending{ it.quantity }

        val maxElements = 5
        var result = allCategories
        if (allCategories.size > maxElements){
            result = allCategories.slice(0 until maxElements).toMutableList()
            val size = allCategories.size
            val others = allCategories.slice(maxElements until size)
            val otherElement = CategoryQuantityDTO("Otros", others.map { it.quantity }.sum())
            result.add(otherElement)
        }

        return result
    }

    fun projectsXyearWcategory(categoryIds: List<String>?, since: Int?, to: Int?): List<ProjectCreationTimelineDTO> {
        val projects = medusaClient.findProjects()

        var years: IntRange
        var minYear: Int? = 0
        var maxYear: Int? = 0
        if(categoryIds.isNullOrEmpty()){
            minYear = projects.map { it.creationDate.year }.distinct().min()
            maxYear = projects.map { it.creationDate.year }.distinct().max()
        } else {
            minYear  = projects.filter { categoryIds!!.contains(it.category.id) }
                                    .map { it.creationDate.year }.distinct()
                                    .min()
            maxYear  = projects.filter { categoryIds!!.contains(it.category.id) }
                                    .map { it.creationDate.year }.distinct()
                                    .max()
        }
        if(since != null){
            minYear = since
        }
        if(to != null){
            maxYear = to
        }

        if(minYear == maxYear){
            minYear = minYear!! - 1
        }

        years = IntRange(minYear!!, maxYear!!)
        val allCategories = categoriesService.categories()

        var categories = listOf<String>()
        if(categoryIds.isNullOrEmpty()){
            categories = projects.map { it.category.id }.distinct()
        } else { categories = categoryIds }

        var result = categories.map {
            val categoryId = it;
            ProjectCreationTimelineDTO(categoryId,
                projects.filter { it.category.id == categoryId }
                .filter {it.creationDate.year in years}
                .groupingBy { it.creationDate.year }
                .eachCount()
                .map { ProjectYearsDTO(it.key, it.value) }
                .sortedBy { it.year }
                 )
        }.map{
            val c = it.category
            ProjectCreationTimelineDTO(allCategories
                .find{it.id == c}!!.name, it.quantities)}
            .sortedByDescending {
                it.quantities.map { it.quantity }.sum()
            }
            .take(5)

        for (year in years) {
            for (category in result) {
                val categoryYears = category.quantities.map {it.year}
                if(!categoryYears.contains(year)) {
                    category.quantities += (ProjectYearsDTO(year, 0))
                }
            }
        }

        return result.map{ ProjectCreationTimelineDTO(it.category, it.quantities.sortedBy { it.year}) }
    }

    fun topProjects(categoryId: String?, organizationId: String?, year: Int?): List<ProjectInfoDTO> {
        val projectRefs: List<ProjectViewsDTO> = statsStorage.topProjectsByCriteria(categoryId, organizationId, year)
        return projectRefs.map {
            val project = medusaClient.findProject(it._id)
            ProjectInfoDTO(
                title = project.title,
                pictureUrl = project.picture?.url,
                projectId = project.id,
                views = it.viewsCount
            )
        }
    }

    fun topTags(year: Int?): List<TagsYearDTO> {
        return statsStorage.topTags(year).map { TagsYearDTO(it._id, it.tagsCount) }
    }

    fun registerTagSearch(projectSearchDTO: ProjectSearchDTO) = statsStorage.insert(projectSearchDTO)

    fun searchCount(): CountDTO {
        return statsStorage.searchCount()
    }

    fun top4categories(): List<CategoryRefDTO> {
        return projectsXcategory(null).take(4).map {
            val categoryName = it.category
            val categoryId = categoriesService.categories().find{ it.name == categoryName}?.id
            CategoryRefDTO(categoryId!!, it.category)
        }
    }

    fun topProjectsFromCategory(categoryId: String): List<ProjectLinkDTO> {
        return topProjects(categoryId, null, null).take(4).map{ProjectLinkDTO(it.projectId, it.title)}
    }
}
