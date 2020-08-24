package com.github.proyeception.benito.controller

import com.github.proyeception.benito.oauth.GoogleDriveOAuthClient
import com.github.proyeception.benito.service.ProjectService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*


@Controller
class DocumentationController(
    private val client: GoogleDriveOAuthClient
) {

    @RequestMapping("/benito/documents/{id}", method = [RequestMethod.GET])
    @ResponseStatus(HttpStatus.MULTIPLE_CHOICES)
    @CrossOrigin
    fun downloadDocument(@PathVariable id: String): String = "redirect:${client.getFile(id)}"
}
