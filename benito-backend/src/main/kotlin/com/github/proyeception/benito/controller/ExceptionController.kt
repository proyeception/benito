package com.github.proyeception.benito.controller

import com.github.proyeception.benito.dto.ErrorDTO
import com.github.proyeception.benito.exception.HttpException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
open class ExceptionController {
    @ExceptionHandler(HttpException::class)
    open fun handle(e: HttpException): ErrorDTO = ErrorDTO(status = e.status, message = e.message)
}