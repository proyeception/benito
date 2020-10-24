package com.github.proyeception.benito.service

import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.storage.StatsStorage

open class StatsService(
    private val statsStorage: StatsStorage
) {

    fun findAll(): List<ProjectVisitDTO> = statsStorage
        .findAll()

    fun registerVisit(projectVisitDTO: ProjectVisitDTO) = statsStorage.insert(projectVisitDTO)
}
