package com.github.proyeception.benito.storage

import com.github.proyeception.benito.dto.ProjectVisitDTO
import org.springframework.data.mongodb.core.MongoTemplate

class StatsStorage(
    private val mongoTemplate: MongoTemplate
) {

    fun findAll() : List<ProjectVisitDTO> {
        return mongoTemplate.findAll(ProjectVisitDTO::class.java)
    }

    fun insert(visit: ProjectVisitDTO) {
        mongoTemplate.insert(visit)
    }
}