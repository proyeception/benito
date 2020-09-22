package com.github.proyeception.benito.client

import arrow.core.Either
import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.GraphConnector
import com.github.proyeception.benito.dto.MedusaProjectDTO

open class MedusaGraphClient(
    private val medusaGraphConnector: GraphConnector
) {
    open fun projectsWithAuthor(
        authorId: String?,
        docContains: String?
    ): Either<Throwable, List<MedusaProjectDTO>> {
        val where = mutableListOf<String>()
        authorId?.let { where.add("""authors: { id: "$it" }""") }
        docContains?.let { where.add("""documentation: { content_contains: "$it" }""") }

        return medusaGraphConnector.execute(
            """
            query  {
              projects(where: { ${where.joinToString(", ")} }) {
                id
                title
                description
                extra_content
                creation_date
                poster {
                  url
                  id
                }
                category {
                  id
                  name
                  tag_name
                }
                organization {
                  id
                  name
                  display_name
                }
                tags {
                  tag_name
                  display_name
                }
                authors {
                  id
                  full_name
                  username
                  profile_pic {
                    id
                    url
                  }
                }
                supervisors {
                  id
                  full_name
                  username
                  profile_pic {
                    id
                    url
                  }
                }
              }
            }
        """.trimIndent()
        ).map { it.deserializeAs(object : TypeReference<List<MedusaProjectDTO>>() {}) }
    }
}