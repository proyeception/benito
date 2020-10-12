package com.github.proyeception.benito.utils;

import com.google.common.collect.ImmutableList;
import org.apache.commons.collections.EnumerationUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.util.ContentCachingResponseWrapper;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.charset.Charset;
import java.util.Collection;
import java.util.List;
import java.util.function.UnaryOperator;
import java.util.stream.Collectors;

public class LoggingFilter implements Filter {
    private static final String AUTHORIZATION_HEADER = "authorization";
    private static final String COOKIE_HEADER = "cookie";
    private static final String SET_COOKIE_HEADER = "set-cookie";

    private static final List<String> EXCLUDED_URIS = ImmutableList.of(
        ".*[.]js",
        ".*[.]css",
        ".*[.]eot",
        ".*[.]woff",
        ".*[.]ttf",
        ".*[.]html",
        "[/]"
    );

    private static final List<String> EXCLUDED_URIS_REQUEST_BODY = ImmutableList.of(
        "/benito/authors/.*/picture",
        "/benito/supervisors/.*/picture",
        "/benito/projects/.*/picture",
        "/benito/projects/.*/documents",
        "/benito/author/login",
        "/benito/supervisor/login"
    );

    private static final List<String> EXCLUDED_URIS_RESPONSE_BODY = ImmutableList.of(
        "/benito/projects/featured",
        "/benito/projects?.*",
        "/benito/session",
        "/benito/author/login",
        "/benito/supervisor/login"
    );

    private static final List<String> EXCLUDED_HEADERS = ImmutableList.of(
        AUTHORIZATION_HEADER,
        "x-qui-token",
        COOKIE_HEADER,
        SET_COOKIE_HEADER
    );

    private static final Logger LOGGER = LoggerFactory.getLogger(LoggingFilter.class);

    @Override
    public void init(FilterConfig filterConfig) {
        // Nothing to see here, move along
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
        ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String url = httpServletRequest.getRequestURI();
        boolean logEnabled = EXCLUDED_URIS.stream().noneMatch(url::matches);
        if (logEnabled) {
            CachedContentRequestWrapper httpRequest = new CachedContentRequestWrapper(httpServletRequest);
            ContentCachingResponseWrapper httpResponse = new ContentCachingResponseWrapper(
                (HttpServletResponse) response
            );
            this.logRequest(httpRequest, url);
            try {
                chain.doFilter(httpRequest, httpResponse);
            } finally {
                this.logResponse(httpResponse, url);
                httpResponse.copyBodyToResponse();
            }
        } else {
            chain.doFilter(request, response);
        }
    }

    private void logRequest(HttpServletRequest request, String url) throws IOException {
        boolean logBody = EXCLUDED_URIS_REQUEST_BODY.stream().noneMatch(url::matches);
        String queryString = StringUtils.isBlank(request.getQueryString()) ? "" : "?" + request.getQueryString();
        LOGGER.info("[REQUEST] -> {}: {}{}", request.getMethod(), request.getRequestURI(), queryString);
        String headers = this.buildHeaders(EnumerationUtils.toList(request.getHeaderNames()), request::getHeader);
        LOGGER.info("[REQUEST] -> Headers: {}", headers);

        if (logBody) {
            String body = this.toString(request.getInputStream());
            LOGGER.info("[REQUEST] -> Body: {}", body);
        }

    }

    private void logResponse(ContentCachingResponseWrapper response, String url) throws IOException {
        boolean logBody = EXCLUDED_URIS_RESPONSE_BODY.stream().noneMatch(url::matches);
        int status = response.getStatus();
        LOGGER.info("[RESPONSE] -> Status {}", status);
        String headers = this.buildHeaders(response.getHeaderNames(), response::getHeader);
        LOGGER.info("[RESPONSE] -> Headers: {}", headers);

        if (logBody) {
            String body = this.toString(response.getContentInputStream());
            LOGGER.info("[RESPONSE] -> Body: {}", body);
        }
    }

    private String toString(InputStream inputStream) throws IOException {
        return StringUtils.replacePattern(StringUtils.trimToEmpty(IOUtils.toString(inputStream,
            Charset.defaultCharset())), "\\r\\n|\\r|\\n", " ");
    }

    private String buildHeaders(Collection<String> headerNames, UnaryOperator<String> headerExtractor) {
        return headerNames.stream()
            .filter(h -> !EXCLUDED_HEADERS.contains(h.toLowerCase()))
            .map(h -> new StringBuilder("'").append(h).append(":").append(headerExtractor.apply(h)).append("'"))
            .collect(Collectors.joining(",", "[", "]"));
    }

    public static class CachedContentRequestWrapper extends HttpServletRequestWrapper {

        private byte[] bodyAsBytes;

        public CachedContentRequestWrapper(HttpServletRequest request) {
            super(request);
        }

        private byte[] getBodyAsBytes() {
            if (this.bodyAsBytes == null) {
                try {
                    this.bodyAsBytes = IOUtils.toByteArray(super.getInputStream());
                } catch (Exception e) {
                    LOGGER.warn("Exception when reading body", e);
                }
            }
            return this.bodyAsBytes;
        }

        @Override
        public ServletInputStream getInputStream() {
            return new Wrapper(new ByteArrayInputStream(this.getBodyAsBytes()));
        }

        @Override
        public BufferedReader getReader() {
            return new BufferedReader(new InputStreamReader(this.getInputStream()));
        }

        private static class Wrapper extends ServletInputStream {

            private final ByteArrayInputStream is;

            public Wrapper(ByteArrayInputStream is) {
                this.is = is;
            }

            @Override
            public int read() {
                return this.is.read();
            }

            @Override
            public boolean isFinished() {
                return false;
            }

            @Override
            public boolean isReady() {
                return true;
            }

            @Override
            public void setReadListener(ReadListener readListener) {
                // Nothing to see here, move along
            }
        }

    }

    @Override
    public void destroy() {
        // Nothing to see here, move along
    }
}
