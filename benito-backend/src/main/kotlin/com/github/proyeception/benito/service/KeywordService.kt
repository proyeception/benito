package com.github.proyeception.benito.service

import com.github.proyeception.benito.dto.ProjectDTO
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import ucar.httpservices.HTTPFactory.Post
import java.util.*


//List<ProjectRecommendationDTO>
public class KeywordService() {
    open fun getKeywords(project: ProjectDTO): String {
        val url = "http://rochychipian.pythonanywhere.com/keywords"
        val map: MutableMap<String, Any> = HashMap()
        map["text"] = "La inteligencia artifical es muy interesante. Los elefantes son animales grandes. La ballena es el mamífero más grande del mundo. la jirafa tiene cuello largo. Plutón no es un planeta, Saturno tampoco. Dios es real. Aguante Perón carajo."

        val restService = RestService(RestTemplateBuilder());

        restService.postRequest(url, map)

        return "hola"
    }
}