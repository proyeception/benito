package com.github.proyeception.benito.client

import arrow.core.Either
import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.GraphConnector
import com.github.proyeception.benito.connector.GraphResponse
import com.github.proyeception.benito.dto.MedusaProjectDTO
import com.github.proyeception.benito.dto.OrderDTO
import com.github.proyeception.benito.extension.replaceUrlSpaces
import org.eclipse.jetty.util.Promise
import org.slf4j.LoggerFactory
import java.util.concurrent.CompletableFuture

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
        title: String? = null,
        category: String? = null,
        authorId: String? = null,
        authorName: String? = null,
        keyword: String? = null,
        organizationId: String? = null,
        organizationName: String? = null,
        id: String? = null,
        projectKeywords: List<String>? = null,
        page: Int = 0,
        tag: String? = null,
        limit: Boolean = true
    ): Either<Throwable, List<MedusaProjectDTO>> {
        val params = formatParams(
            orderBy = orderBy,
            from = from,
            to = to,
            title = title,
            category = category,
            authorId = authorId,
            authorName = authorName,
            keyword = keyword,
            organizationId = organizationId,
            organizationName = organizationName,
            page = page,
            id = id,
            projectKeywords = projectKeywords,
            requiresLimit = limit
        )
        LOGGER.info("Search params: $params")

        return medusaGraphConnector.execute(
            """
            query {
              projects($params) {
                id
                title
                description
                extra_content
                creation_date
                picture {
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
                  header {
                    id
                    url
                  }
                  color
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
                  mail
                  about
                  facebook
                  twitter
                  linkedin
                  ghost
                }
                supervisors {
                  id
                  full_name
                  username
                  profile_pic {
                    id
                    url
                  }
                  mail
                  about
                  facebook
                  twitter
                  linkedin
                  ghost
                }
                documentation {
                  id
                  file_name
                  drive_id
                }
                ${keyword?.let { """
                keyword_matching_docs: documentation(where: { content_contains: "$it" } ) {
                  id
                  file_name
                  drive_id
                }
                """.trimIndent() } ?: ""}
                recommendations {
                  id
                  score
                  project {
                    id
                  }
                }
                open
                project_keywords {
                  name
                  score
                }
                drive_folder_id
                views
              }
            }
        """.trimIndent()
        )
            .map { res ->
                res.map { b ->
                    b.mapValues { (_, p) -> p as List<Map<String, Any>> }
                        .mapValues { (_, p) ->
                            p.map {
                                it.mapValues { (k, v) -> simplifyRecommendations(k, v) }
                            }
                        }
                }
            }
            .map { it.deserializeAs(PROJECTS_REF).projects }
    }

    open fun countProjects(
        from: String? = null,
        to: String? = null,
        title: String? = null,
        category: String? = null,
        authorId: String? = null,
        authorName: String? = null,
        keyword: String? = null,
        organizationId: String? = null,
        organizationName: String? = null,
        id: String? = null,
        projectKeywords: List<String>? = null
    ): Either<Throwable, Int> {
        val params = formatParams(
            from = from,
            to = to,
            title = title,
            category = category,
            authorId = authorId,
            authorName = authorName,
            keyword = keyword,
            organizationId = organizationId,
            organizationName = organizationName,
            id = id,
            projectKeywords = projectKeywords
        )

        LOGGER.info("Search params: $params")

        val execute: Either<Throwable, GraphResponse> = medusaGraphConnector.execute(
            """
            query {
              projectsConnection($params) {
                aggregate {
                  count
                }
              }
            }
        """.trimIndent()
        )

        return execute.map { it.body!!["projectsConnection"] as LinkedHashMap<String, LinkedHashMap<String, Int>> }
                        .map { it["aggregate"]!!["count"]!! }
    }

    private fun simplifyRecommendations(k: String, v: Any): Any {
        fun simplifyRecommendation(rec: Map<String, Any?>): Map<String, Any?> {

            val projectId = (rec["project"] as Map<String, String?>?)?.get("id") ?: ""

            return mapOf(
                "id" to rec["id"],
                "score" to rec["score"],
                "project" to projectId
            )
        }

        return when (k) {
            "recommendations" -> (v as List<Map<String, Any>>).map { simplifyRecommendation(it) }
            else -> v
        }
    }

    open fun formatParams(
        orderBy: OrderDTO? = null,
        from: String? = null,
        to: String? = null,
        title: String? = null,
        category: String? = null,
        authorId: String? = null,
        authorName: String? = null,
        keyword: String? = null,
        organizationId: String? = null,
        organizationName: String? = null,
        id: String? = null,
        projectKeywords: List<String>? = null,
        page: Int = 0,
        requiresLimit: Boolean = true
    ): String {
        val where = mutableListOf<String>()
        title?.let { where.add("""title_contains: "$it"""") }
        keyword?.let { where.add("""documentation: { content_contains: "${it.replaceUrlSpaces()}" }""") }
        from?.let { where.add("""creation_date_gte: "$it"""") }
        to?.let { where.add("""creation_date_lte: "$it"""") }
        category?.let { where.add("""category: { tag_name: "$it" }""") }
        authorId?.let { where.add("""authors: { id: "$it" }""") }
        authorName?.let { where.add("""authors: { full_name_contains: "${it.replaceUrlSpaces()}" }""") }
        organizationId?.let { where.add("""organization: { id: "$it" }""") }
        organizationName?.let { where.add("""organization: { name: "$it" }""") }
        id?.let { where.add("""id: "$it"""") }
        projectKeywords?.let {
            ks -> where.add("""project_keywords: { name_in: [${ks.joinToString(",") { "\"$it\"" } }] }""")
        }

        val sort = orderBy?.let { """sort: "${it.sortMethod}"""" }

        val startValue: Int = if (requiresLimit) page * PAGE_SIZE else 0
        val start = """start: $startValue"""

        val limit = """limit: $PAGE_SIZE"""

        val params = mutableListOf<String>()
        where.takeUnless { it.isEmpty() }?.let {
            params.add("where: { ${it.joinToString(", ")} }")
        }

        params.add(start)

        if(requiresLimit) {
            params.add(limit)
        }
        sort?.let { params.add(it) }

        return params.joinToString(", ")
    }

    private companion object {
        private val PROJECTS_REF = object : TypeReference<Projects>() {}
        private val SINGLE_PROJECT_REF = object : TypeReference<MedusaProjectDTO>() {}
        private const val PAGE_SIZE = 10
        private val LOGGER = LoggerFactory.getLogger(MedusaGraphClient::class.java)
    }
}