package com.github.proyeception.benito.controller

import com.github.proyeception.benito.service.MangoService
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ResponseBody

@Controller
class BenitoController(
    private val mangoService: MangoService
) {
    @GetMapping("hello-world")
    @ResponseBody
    fun hello(): String = "Hello!"
}