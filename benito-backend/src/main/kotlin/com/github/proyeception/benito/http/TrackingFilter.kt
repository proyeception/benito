package com.github.proyeception.benito.http

import com.github.proyeception.benito.utils.ThreadMap
import org.apache.commons.lang3.RandomStringUtils
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import javax.servlet.*
import javax.servlet.http.HttpServletRequest

@Component
@Order(1)
class TrackingFilter : Filter {
    override fun init(filterConfig: FilterConfig) = Unit

    override fun doFilter(
        request: ServletRequest?,
        response: ServletResponse?,
        chain: FilterChain
    ) {
        if (request is HttpServletRequest) {
            val requestId = request.getHeader("qui-id")
                ?: lazy { RandomStringUtils.randomAlphanumeric(8) }.value
            ThreadMap.put("reqId", requestId)
            chain.doFilter(request, response)
        }
    }

    override fun destroy() {}
}