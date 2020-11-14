package com.github.proyeception.benito.service

import com.github.proyeception.benito.dto.KeywordDTO
import com.github.proyeception.benito.dto.KeywordsWrapper
import com.github.proyeception.benito.dto.ProjectKeywords
import com.github.proyeception.benito.exception.FailedDependencyException
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.core.ParameterizedTypeReference
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

import org.springframework.web.client.RestTemplate
import java.util.*

@Service
open class RestService(restTemplateBuilder: RestTemplateBuilder) {
    private val restTemplate = restTemplateBuilder.build()

    open fun postRequest(url: String, body: MutableMap<String, String>): List<KeywordDTO> {
        val headers = HttpHeaders()
        val entity: HttpEntity<Map<String, Any>> = HttpEntity(body, headers)
        return this.restTemplate.postForEntity(url, entity, KeywordsWrapper::class.java)
            .body
            ?.keywords
            ?: throw FailedDependencyException("Failed to POST  $url")
    }

    open fun postRequestHashtags(url: String, body: MutableMap<String, String>): List<String> {
        val headers = HttpHeaders()
        val entity: HttpEntity<Map<String, Any>> = HttpEntity(body, headers)

        return this.restTemplate.postForEntity(url, entity, ProjectKeywords::class.java)
            .body
            ?.project_keywords
            ?: throw FailedDependencyException("Failed POST hashtags on $url")
    }
}