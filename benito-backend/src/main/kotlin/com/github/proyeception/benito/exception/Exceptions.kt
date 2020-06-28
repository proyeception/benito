package com.github.proyeception.benito.exception

open class HttpException(msg: String, status: Int) : RuntimeException(msg)

class AuthenticationFailedException(msg: String) : RuntimeException(msg)
class FailedDependencyException(msg: String) : HttpException(msg, 424)