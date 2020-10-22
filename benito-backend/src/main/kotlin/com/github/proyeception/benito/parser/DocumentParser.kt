package com.github.proyeception.benito.parser

import org.apache.tika.metadata.Metadata
import org.apache.tika.parser.AutoDetectParser
import org.apache.tika.parser.ParseContext
import org.apache.tika.sax.BodyContentHandler
import org.slf4j.LoggerFactory
import java.io.InputStream
import java.lang.Exception

open class DocumentParser(
    private val parser: AutoDetectParser
) {
    open fun parse(stream: InputStream, fileName: String): String? = try {
        val handler = BodyContentHandler()
        val metadata = Metadata()
        stream.use { parser.parse(it, handler, metadata, ParseContext()) }
        handler.toString()
    } catch (e: Exception) {
        LOGGER.error("Failed to parse file $fileName")
        null
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(DocumentParser::class.java)
    }
}