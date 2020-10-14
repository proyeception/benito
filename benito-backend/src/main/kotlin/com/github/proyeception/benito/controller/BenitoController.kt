package com.github.proyeception.benito.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.servlet.ModelAndView

@Controller
open class BenitoController {
    @GetMapping(value = [
        "/",
        "/search",
        "/projects/*",
        "projects/*/edit",
        "/authors/*",
        "/supervisors/*",
        "/me/*",
        "/login"
    ])
    open fun index(): ModelAndView = ModelAndView("index")
}