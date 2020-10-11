package com.github.proyeception.benito.exception

sealed class HttpException(
    val status: Int,
    message: String,
    cause: Throwable? = null
) : RuntimeException(message, cause) {
    companion object {
        fun of(status: Int?, message: String): HttpException = when (status) {
            400 -> BadRequestException(message)
            401 -> UnauthorizedException(message)
            403 -> ForbiddenException(message)
            404 -> NotFoundException(message)
            424 -> FailedDependencyException(message)
            else -> InternalServerErrorException(message)
        }
    }
}

class BadRequestException(message: String) : HttpException(400, message)
class UnauthorizedException(message: String) : HttpException(401, message)
class ForbiddenException(message: String) : HttpException(403, message)
class NotFoundException(message: String) : HttpException(404, message)
class FailedDependencyException(message: String, cause: Throwable? = null) : HttpException(424, message, cause)
class InternalServerErrorException(message: String, cause: Throwable?) : HttpException(500, message) {
    constructor(message: String) : this(message, null)
}

class AmbiguousReferenceException(message: String) : RuntimeException(message)

class EmptyGraphBodyException(message: String) : RuntimeException(message)

class GraphQueryException(val messages: List<String>) : RuntimeException()
