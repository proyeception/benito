package com.github.proyeception.benito.service

import com.github.proyeception.benito.dto.KeywordDTO
import com.github.proyeception.benito.dto.ProjectDTO
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import ucar.httpservices.HTTPFactory.Post
import java.util.*

public class KeywordService() {
    open fun getKeywords(project: ProjectDTO): List<KeywordDTO> {
        val url = "http://rochychipian.pythonanywhere.com/keywords"
        val map: MutableMap<String, String> = HashMap()
        val content = project.title + project.description + project.extraContent

        map["text"] = content

        val restService = RestService(RestTemplateBuilder());
        val result = restService.postRequest(url, map)

        println(content)
        println(result)

        return result
    }

    open fun getKeywordsFromText(text: String): List<KeywordDTO> { //delete. para la demo.
        val url = "http://rochychipian.pythonanywhere.com/keywords"
        val map: MutableMap<String, String> = HashMap()

        map["text"] = text

        val restService = RestService(RestTemplateBuilder());
        val result = restService.postRequest(url, map)

        println(result)

        return result
    }
}