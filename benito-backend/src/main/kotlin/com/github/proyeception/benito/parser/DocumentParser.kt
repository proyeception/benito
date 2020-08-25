package com.github.proyeception.benito.parser

import org.apache.tika.parser.AutoDetectParser
import org.apache.tika.sax.BodyContentHandler
import org.apache.tika.metadata.Metadata
import java.io.InputStream

open class DocumentParser(
    private val parser: AutoDetectParser
) {
    open fun parse(input: InputStream): String {
        val handler = BodyContentHandler()
        val metadata = Metadata()

        parser.parse(input, handler, metadata)

        return handler.toString()
    }
}