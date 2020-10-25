package com.github.proyeception.benito.storage

import com.github.proyeception.benito.dto.*
import org.joda.time.LocalDate
import org.springframework.data.domain.Sort
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.aggregation.Aggregation
import org.springframework.data.mongodb.core.aggregation.Aggregation.*
import org.springframework.data.mongodb.core.aggregation.GroupOperation
import org.springframework.data.mongodb.core.aggregation.MatchOperation
import org.springframework.data.mongodb.core.aggregation.SortOperation
import org.springframework.data.mongodb.core.query.Criteria


class StatsStorage(
    private val mongoTemplate: MongoTemplate
) {

    fun findAll() : List<ProjectVisitDTO> {
        return mongoTemplate.findAll(ProjectVisitDTO::class.java)
    }

    fun insert(visit: ProjectVisitDTO) {
        mongoTemplate.insert(visit)
    }

    fun insert(search: ProjectSearchDTO) {
        mongoTemplate.insert(search)
    }

    fun topProjectsByCriteria(categoryId: String?, organizationId: String?, year: Int?): List<ProjectViewsDTO> {

        val filters = mutableListOf<MatchOperation>()

        if(!categoryId.isNullOrBlank()) {
            val matchCategory = Aggregation.match(
                Criteria.where("categoryId").`is`(categoryId)
            )
            filters.add(matchCategory)
        }

        if(!organizationId.isNullOrBlank()) {
            val matchOrganization = Aggregation.match(
                Criteria.where("organizationId").`is`(organizationId)
            )
            filters.add(matchOrganization)
        }

        if(year != null) {
            val firstDate = LocalDate.parse(year.toString() + "-01-01")
            val lastDate = LocalDate.parse(year.toString() + "-12-31")
            val matchYear = Aggregation.match(
                Criteria.where("visitedOn").gte(firstDate).lte(lastDate)
            )
            filters.add(matchYear)
        }

        val viewsCount: GroupOperation = group("projectId")
                                                .count()
                                                .`as`("viewsCount")

        val sortByViewsCount: SortOperation = sort(Sort.by(Sort.Direction.ASC, "viewsCount"))

        val projectToMatchModel = project()
            .andExpression("projectId").`as`("projectId")
            .andExpression("viewsCount").`as`("viewsCount")

        val aggregation: Aggregation = newAggregation(
            *filters.toTypedArray(),
            viewsCount, sortByViewsCount, projectToMatchModel)

        return mongoTemplate.aggregate(aggregation, "project_visit", ProjectViewsDTO::class.java).mappedResults
    }

    fun topTags(year: Int?): List<TagsSearchDTO> {

        val filters = mutableListOf<MatchOperation>()

        if(year != null) {
            val firstDate = LocalDate.parse(year.toString() + "-01-01")
            val lastDate = LocalDate.parse(year.toString() + "-12-31")
            val matchYear = Aggregation.match(
                Criteria.where("visitedOn").gte(firstDate).lte(lastDate)
            )
            filters.add(matchYear)
        }

        val searchCount: GroupOperation = group("tag")
            .count()
            .`as`("tagsCount")

        val sortBySearchCount: SortOperation = sort(Sort.by(Sort.Direction.DESC, "tagsCount"))

        val aggregation: Aggregation = newAggregation(
            *filters.toTypedArray(),
            searchCount, sortBySearchCount)

        val a = mongoTemplate.aggregate(aggregation, "project_search", TagsSearchDTO::class.java)
        println(a)
        return a.mappedResults
        //return listOf<TagsSearchDTO>()
    }
}