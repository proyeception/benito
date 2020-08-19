package com.github.proyeception.benito.controller

import com.github.proyeception.benito.oauth.GoogleDriveOAuthClient
import com.github.proyeception.benito.service.ProjectService
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*


@Controller
class DocumentationController(
    private val projectService: ProjectService
) {

    @RequestMapping("/benito/documentation/{id}", method = [RequestMethod.GET])
    @ResponseBody
    @CrossOrigin
    private fun downloadDocument(@PathVariable id: String): ResponseEntity<String> {
        val client: GoogleDriveOAuthClient = GoogleDriveOAuthClient()
        return ResponseEntity.status(300).body(client.getFile(id))
    }
}
