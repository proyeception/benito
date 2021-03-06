package com.github.proyeception.benito.controller

import com.github.proyeception.benito.X_QUI_TOKEN
import com.github.proyeception.benito.service.ProjectService
import com.github.proyeception.benito.service.SessionService
import com.github.proyeception.benito.service.UserService
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.servlet.ModelAndView
import javax.ws.rs.Path

@Controller
open class BenitoController(
    private val userService: UserService,
    private val projectService: ProjectService,
    private val sessionService: SessionService
) {
    @GetMapping(value = ["/"])
    open fun index(): ModelAndView = ModelAndView("index", mapOf("title" to "Proyectate"))

    @GetMapping(value = ["/login"])
    open fun login(): ModelAndView = ModelAndView("index", mapOf("title" to "Iniciar sesión en Proyectate"))

    @GetMapping(value = ["/legal"])
    open fun legal(): ModelAndView = ModelAndView("index", mapOf("title" to "Términos y condiciones"))

    @GetMapping(value = ["/me/*", "/search", "/projects/create"])
    open fun noIndex(): ModelAndView = ModelAndView(
        "index",
        mapOf(
            "title" to "Proyectate",
            "no_index" to true
        )
    )

    @GetMapping(value = ["/projects/{id}"])
    open fun project(@PathVariable id: String): ModelAndView = ModelAndView(
        "index",
        projectService.findProject(id).let {
            mapOf(
                "title" to it.title,
                "meta" to mapOf(
                    "url" to "/projects/$id",
                    "type" to "article",
                    "title" to it.title,
                    "description" to it.description,
                    "image" to it.pictureUrl
                )
            )
        }
    )

    @GetMapping(value = ["/projects/{id}/edit"])
    open fun editProject(
        @PathVariable id: String,
        @CookieValue(value = X_QUI_TOKEN, required = false) sessionToken: String?
    ): ModelAndView = ModelAndView(
        "index",
        mapOf(
            "no_index" to true,
            sessionToken?.let { sessionService[it] }?.userId?.let {
                projectService.findProject(id).takeIf { p ->
                    p.authors.any { a -> a.id == it } || p.supervisors.any { s -> s.id == it }
                }
            }
                ?.let { "title" to it.title }
                ?: "title" to "Proyectate"
        )
    )

    @GetMapping(value = ["/authors/{id}"])
    open fun author(@PathVariable id: String): ModelAndView = ModelAndView(
        "index",
        mapOf("title" to userService.findAuthor(id).fullName)
    )

    @GetMapping(value = ["/supervisors/{id}"])
    open fun supervisor(@PathVariable id: String): ModelAndView = ModelAndView(
        "index",
        mapOf("title" to userService.findSupervisor(id).fullName)
    )
}