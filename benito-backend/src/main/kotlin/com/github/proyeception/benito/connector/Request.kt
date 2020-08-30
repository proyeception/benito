package com.github.proyeception.benito.connector

import org.apache.http.entity.ContentType
import java.io.File

data class MultipartMetadata(
    val parts: List<PartMetadata>
) : RequestBody()

data class PartMetadata(
    val textBody: TextBodyMetadata,
    val binaryBody: BinaryBodyMetadata
)

class MultipartMetadataBuilder {
    private val parts: MutableList<PartMetadata> = mutableListOf()
    private var textName = ""
    private var textText = ""
    private var file: File? = null
    private var binaryName: String = ""
    private var binaryContentType: ContentType = ContentType.DEFAULT_TEXT

    fun setText(name: String, text: String): MultipartMetadataBuilder {
        this.textName = name
        this.textText = text
        return this
    }

    fun setBinary(binaryName: String, f: File, c: ContentType): MultipartMetadataBuilder {
        this.binaryName = binaryName
        this.file = f
        this.binaryContentType = c

        return this
    }

    fun buildPart(): MultipartMetadataBuilder {
        if (textName.isEmpty() || textText.isEmpty() || file == null || binaryName.isEmpty()) {
            throw IllegalStateException("""
|Text metadata and binary metadata required:
|   textName: $textName
|   textText: $textText
|   file: $file
|   binaryName: $binaryName
                """.trimMargin())
        }

        val partMetadata = PartMetadata(
            textBody = TextBodyMetadata(
                name = textName,
                text = textText
            ),
            binaryBody = BinaryBodyMetadata(
                name = binaryName,
                file = file!!,
                contentType = binaryContentType
            )
        )

        parts.add(partMetadata)
        reset()

        return this
    }

    fun build(): MultipartMetadata = MultipartMetadata(parts)

    private fun reset() {
        textName = ""
        textText = ""
        binaryName = ""
        file = null
        binaryContentType = ContentType.DEFAULT_TEXT
    }
}

data class TextBodyMetadata(
    val name: String,
    val text: String,
    val contentType: ContentType = ContentType.DEFAULT_TEXT
)

data class BinaryBodyMetadata(
    val name: String,
    val file: File,
    val contentType: ContentType,
    val filename: String = file.absolutePath
)

data class SimpleJsonRequest(
    val body: Any
) : RequestBody()

sealed class RequestBody
