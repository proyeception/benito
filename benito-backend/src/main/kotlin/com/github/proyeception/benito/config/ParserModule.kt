package com.github.proyeception.benito.config

import com.github.proyeception.benito.parser.DocumentParser
import org.apache.tika.parser.AutoDetectParser
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class ParserModule {
    @Bean("documentParser")
    open fun documentParser() = DocumentParser(
        parser = AutoDetectParser()
    )
}