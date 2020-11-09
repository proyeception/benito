package com.github.proyeception.benito.controller

import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.service.CategoriesService
import com.github.proyeception.benito.service.StatsService
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody

@Controller
open class CategoriesController(
    private val categoriesService: CategoriesService,
    private val statsService: StatsService
) {
    @RequestMapping("/benito/categories", method = [RequestMethod.GET])
    @ResponseBody
    open fun categories(): List<CategoryDTO> = categoriesService.categories()

    @RequestMapping("/benito/categories-count")
    @ResponseBody
    open fun count(): CountDTO = categoriesService.count()

    @RequestMapping("/benito/top4categories")
    @ResponseBody
    open fun top4categories(): CategoryListDTO = CategoryListDTO(statsService.top4categories())

    @RequestMapping("/benito/top-projects-category")
    @ResponseBody
    open fun topProjectsFromCategory(
        @PathVariable categoryId: String
    ): ProjectLinksDTO = ProjectLinksDTO(statsService.topProjectsFromCategory(categoryId))
}