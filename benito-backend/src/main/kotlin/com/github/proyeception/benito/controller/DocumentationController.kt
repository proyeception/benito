package com.github.proyeception.benito.controller

import com.github.proyeception.benito.service.DocumentService
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@Controller
class DocumentationController(
    private val documentService: DocumentService
) {

    @RequestMapping("/benito/documents/{id}", method = [RequestMethod.GET])
    @ResponseStatus(HttpStatus.MULTIPLE_CHOICES)
    fun downloadDocument(@PathVariable id: String): String = "redirect:${documentService.fileWebContentLink(id)}"
}
