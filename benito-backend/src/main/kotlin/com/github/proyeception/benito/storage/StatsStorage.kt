package com.github.proyeception.benito.storage

import com.github.proyeception.benito.dto.ProjectInfoDTO
import com.github.proyeception.benito.dto.ProjectVisitDTO
import com.mongodb.client.model.Aggregates.group
import com.mongodb.client.model.Aggregates.match
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.aggregation.*
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

    fun topProjectsByCriteria(categoryId: String?, organizationId: String?, year: Int?): List<ProjectInfoDTO> {
        val matchCategory = Aggregation.match(
            Criteria.where("category").elemMatch(Criteria.where("id").`is`(categoryId))
        )
        val matchOrganization = Aggregation.match(
            Criteria.where("organization").elemMatch(Criteria.where("id").`is`(organizationId))
        )
        val matchYear = Aggregation.match(
            Criteria.where("creation_date").`is`(year)
        )

        return listOf<ProjectInfoDTO>()
    }
}