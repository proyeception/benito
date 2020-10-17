package com.github.proyeception.benito.parser

import org.apache.tika.metadata.Metadata
import org.apache.tika.parser.AutoDetectParser
import org.apache.tika.parser.ParseContext
import org.apache.tika.sax.BodyContentHandler
import java.io.InputStream

open class DocumentParser(
    private val parser: AutoDetectParser
) {
    open fun parse(stream: InputStream): String {
        val handler = BodyContentHandler()
        val metadata = Metadata()
        stream.use { parser.parse(it, handler, metadata, ParseContext()) }
        return handler.toString()
    }
}