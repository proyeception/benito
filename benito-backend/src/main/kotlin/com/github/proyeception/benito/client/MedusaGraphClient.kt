package com.github.proyeception.benito.client

import arrow.core.Either
import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.GraphConnector
import com.github.proyeception.benito.dto.MedusaProjectDTO

open class MedusaGraphClient(
    private val medusaGraphConnector: GraphConnector
) {
    data class Projects(
        val projects: List<MedusaProjectDTO>
    )

    open fun projectsWithAuthor(
        authorId: String?,
        docContains: String?
    ): Either<Throwable, List<MedusaProjectDTO>> {
        val where = mutableListOf<String>()
        authorId?.let { where.add("""authors: { id: "$it" }""") }
        docContains?.let { where.add("""documentation: { content_contains: "$it" }""") }

        return medusaGraphConnector.execute(
            """
            query {
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
                  image_url
                }
                organization {
                  id
                  name
                  display_name
                  icon {
                    id
                    url
                  }
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
                documentation {
                  id
                  file_name
                  drive_id
                }
              }
            }
        """.trimIndent()
        ).map { it.deserializeAs(PROJECTS_REF).projects }
    }

    private companion object {
        private val PROJECTS_REF = object : TypeReference<Projects>() {}
    }
}