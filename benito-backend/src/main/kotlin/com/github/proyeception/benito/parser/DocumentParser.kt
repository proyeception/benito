package com.github.proyeception.benito.parser

import org.apache.tika.metadata.Metadata
import org.apache.tika.parser.AutoDetectParser
import org.apache.tika.sax.BodyContentHandler
import java.io.InputStream

open class DocumentParser(
    private val parser: AutoDetectParser
) {
    public fun parse(stream: InputStream): String {
        val handler = BodyContentHandler()
        val metadata = Metadata()
        try {
            parser.parse(stream, handler, metadata)
        } finally {
            stream.close()
        }
        return handler.toString()
    }
}