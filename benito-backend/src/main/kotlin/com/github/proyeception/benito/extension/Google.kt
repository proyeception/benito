package com.github.proyeception.benito.extension

import com.github.proyeception.benito.dto.GoogleFileDTO

fun GoogleFileDTO.export(mimeType: String): String =
    "https://www.googleapis.com/drive/v3/files/${this.id}/export?mimeType=$mimeType"
