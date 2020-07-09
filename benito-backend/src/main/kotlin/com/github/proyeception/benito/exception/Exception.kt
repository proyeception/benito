package com.github.proyeception.benito.exception

sealed class HttpException(val status: Int, message: String) : RuntimeException(message) {
    companion object {
        fun of(status: Int): (String) -> HttpException = { message: String ->
            when (status) {
                400 -> BadRequestException(message)
                401 -> UnauthorizedException(message)
                403 -> ForbiddenException(message)
                404 -> NotFoundException(message)
                424 -> FailedDependencyException(message)
                else -> InternalServerErrorException(message)
            }
        }
    }
}

class BadRequestException(message: String) : HttpException(400, message)
class UnauthorizedException(message: String) : HttpException(401, message)
class ForbiddenException(message: String) : HttpException(403, message)
class NotFoundException(message: String) : HttpException(404, message)
class FailedDependencyException(message: String) : HttpException(424, message)
class InternalServerErrorException(message: String, cause: Throwable?) : HttpException(500, message) {
    constructor(message: String) : this(message, null)
}
