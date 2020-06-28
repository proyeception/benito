package com.github.proyeception.benito.exception

class AuthenticationFailedException(msg: String) : RuntimeException(msg)

open class HttpException(msg: String, status: Int) : RuntimeException(msg)
class FailedDependencyException(msg: String) : HttpException(msg, 424)