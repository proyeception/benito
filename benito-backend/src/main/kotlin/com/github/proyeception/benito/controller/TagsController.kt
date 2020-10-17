package com.github.proyeception.benito.controller;

import com.github.proyeception.benito.service.*
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
class TagsController (
    private val keywordService: KeywordService
) {
    @RequestMapping("/benito/tags", method = [RequestMethod.POST])
    @ResponseBody
    fun featuredProjects(@RequestBody content: String): List<String> = keywordService.getKeywordsFromPlainText(content);
}