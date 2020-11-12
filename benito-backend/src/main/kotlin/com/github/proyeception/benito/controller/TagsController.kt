package com.github.proyeception.benito.controller;

import com.github.proyeception.benito.dto.ProjectLinksDTO
import com.github.proyeception.benito.service.*
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*
import javax.validation.constraints.NotBlank


@Controller
class TagsController (
    private val keywordService: KeywordService,
    private val recommendationService: RecommendationService
) {
    @RequestMapping("/benito/tags", method = [RequestMethod.POST])
    @ResponseBody
    fun getTags(@RequestBody content: String): List<String> = keywordService.getKeywordsFromPlainText(content)

    @RequestMapping("/benito/recommendations-by-text", method = [RequestMethod.GET])
    @ResponseBody
    fun getRecommendationsByText(@RequestParam(required = false) textSearch: String): ProjectLinksDTO = ProjectLinksDTO(recommendationService.getRecommendedProjects(textSearch))
}