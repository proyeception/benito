package com.github.proyeception.benito.client

import arrow.core.Either
import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.GraphConnector
import com.github.proyeception.benito.dto.MedusaProjectDTO
import com.github.proyeception.benito.dto.OrderDTO
import com.github.proyeception.benito.extension.replaceUrlSpaces

open class MedusaGraphClient(
    private val medusaGraphConnector: GraphConnector
) {
    data class Projects(
        val projects: List<MedusaProjectDTO>
    )

    open fun findProjects(
        orderBy: OrderDTO? = null,
        from: String? = null,
        to: String? = null,
        nameContains: String? = null,
        category: String? = null,
        authorId: String? = null,
        authorName: String? = null,
        keyword: String? = null,
        page: Int = 0
    ): Either<Throwable, List<MedusaProjectDTO>> {
        val where = mutableListOf<String>()
        authorId?.let { where.add("""authors: { id: "$it" }""") }
        keyword?.let { where.add("""documentation: { content_contains: "${it.replaceUrlSpaces()}" }""") }
        from?.let { where.add("""creation_date_gte: "$it"""") }
        to?.let { where.add("""creation_date_lte: "$it"""") }
        nameContains?.let { where.add("""title_contains: "$it"""") }
        category?.let { where.add("""category: { name: "$it" }""") }
        authorName?.let { where.add("""authors: { full_name_contains: "${it.replaceUrlSpaces()}" }""")}

        val sort = orderBy?.let { """sort: "${it.sortMethod}"""" }

        val start = """start: ${page * PAGE_SIZE}"""

        val limit = """limit: $PAGE_SIZE"""

        val params = mutableListOf<String>()
        where.takeUnless { it.isEmpty() }?.let {
            params.add("where: { ${it.joinToString(", ")} }")
        }
        params.add(start)
        params.add(limit)
        sort?.let { params.add(it) }

        return medusaGraphConnector.execute(
            """
            query {
              projects(${params.joinToString(", ")}) {
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
        private const val PAGE_SIZE = 15
    }
}