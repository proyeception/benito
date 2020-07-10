package com.github.proyeception.benito.exception

sealed class HttpException(val status: Int, message: String) : RuntimeException(message)

class BadRequestException(message: String) : HttpException(400, message)
class UnauthorizedException(message: String) : HttpException(401, message)
class ForbiddenException(message: String) : HttpException(403, message)
class NotFoundException(message: String) : HttpException(404, message)
class FailedDependencyException(message: String) : HttpException(424, message)
class InternalServerErrorException(message: String, cause: Throwable?) : HttpException(500, message) {
    constructor(message: String) : this(message, null)
}
