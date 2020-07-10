package com.github.proyeception.benito.controller

import com.github.proyeception.benito.config.Environment
import com.github.proyeception.benito.dto.ErrorDTO
import com.github.proyeception.benito.exception.HttpException
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.ResponseStatus
import javax.servlet.http.HttpServletResponse

@ControllerAdvice
open class ExceptionController(
    private val environment: Environment
) {
    @ExceptionHandler(HttpException::class)
    @ResponseBody
    open fun handle(e: HttpException, response: HttpServletResponse): ErrorDTO = ErrorDTO(
        status = e.status,
        message = e.message,
        stackTrace = appendStackTrace(e)
    ).also { response.status = e.status }

    @ExceptionHandler(Exception::class)
    @ResponseBody
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    open fun handle(e: Exception): ErrorDTO = ErrorDTO(
        status = 500,
        message = e.message,
        stackTrace = appendStackTrace(e)
    )

    private fun appendStackTrace(t: Throwable): List<String>? = if (!environment.isProd) t.stackTrace.map { it.toString() }
    else null
}