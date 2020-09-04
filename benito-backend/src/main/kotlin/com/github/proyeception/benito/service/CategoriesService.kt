package com.github.proyeception.benito.service

import com.github.proyeception.benito.dto.CountDTO
import com.github.proyeception.benito.snapshot.CategorySnapshot

open class CategoriesService(
    private val categorySnapshot: CategorySnapshot
) {
    open fun categories() = categorySnapshot.findAll()

    open fun count() = CountDTO(categorySnapshot.count())
}