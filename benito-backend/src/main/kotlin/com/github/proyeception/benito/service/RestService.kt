package com.github.proyeception.benito.service

import com.github.proyeception.benito.dto.KeywordDTO
import com.github.proyeception.benito.dto.KeywordsWrapper
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.core.ParameterizedTypeReference
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

import org.springframework.web.client.RestTemplate
import java.util.*


@Service
class RestService(restTemplateBuilder: RestTemplateBuilder) {
    private val restTemplate: RestTemplate
    val postsPlainJSON: String
        get() {
            val url = "https://jsonplaceholder.typicode.com/posts"
            return restTemplate.getForObject(url, String::class.java)
        }

    init {
        restTemplate = restTemplateBuilder.build()
    }

    open fun postRequest(url: String, body: MutableMap<String, Any>) {
        val headers = HttpHeaders()
        val entity: HttpEntity<Map<String, Any>> = HttpEntity(body, headers)
        val response = this.restTemplate.postForEntity(url, entity, KeywordsWrapper::class.java)
        println(response.body)
    }

    inline fun <reified T: Any> typeRef(): ParameterizedTypeReference<T> = object: ParameterizedTypeReference<T>(){}
}