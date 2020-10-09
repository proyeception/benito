package com.github.proyeception.benito.mongodb

import com.github.proyeception.benito.dto.*
import com.mongodb.MongoClientURI
import com.mongodb.client.AggregateIterable
import com.mongodb.client.MongoCursor
import com.mongodb.client.model.Aggregates
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Projections
import org.bson.Document
import org.bson.conversions.Bson
import java.math.BigDecimal


open class MongoTextSearch(
    private val user: String,
    private val databaseName: String,
    private val password: String,
    private val host: String,
    private val port: Int
) {
    private val documentsCollection: String = "documentations"
    private val projectsCollection: String = "projects"

    private fun startConnection(): com.mongodb.MongoClient {
        val uri = MongoClientURI(
            "mongodb+srv://$user:$password@$host/$databaseName?retryWrites=true&w=majority"
        )
        return com.mongodb.MongoClient(uri)
    }


    open fun getDocuments(line: String, from: String?, to: String?, nameContains: String?, category: String?): MutableList<ProjectDTO> {
        val mongoClient = startConnection()
        val mongoCollection = mongoClient.getDatabase(databaseName).getCollection(documentsCollection)
        val cursor: MongoCursor<Document> = mongoCollection.find(
            Filters.text("\\" + line + "\\"))
            .projection(
                Projections.fields(
                    Projections.metaTextScore("score")
                )
            )
            .sort(Projections.metaTextScore("score"))
            .cursor()

        val projects = mutableSetOf<ProjectDTO>()
        val mongoCollectionProjects = mongoClient.getDatabase(databaseName).getCollection(projectsCollection)

        val variableFilters: List<Bson> = createVariableFilters(from, to, nameContains, category);

        //el match siempre tiene que ser primero para mejorar performace
        val pipeline = mutableListOf(
            Aggregates.match(Filters.eq("documentation", "")),
            Aggregates.lookup("authors", "authors", "_id", "authors"),
            Aggregates.lookup("organizations", "organization", "_id", "organization"),
            Aggregates.lookup("supervisors", "supervisors", "_id", "supervisors"),
            Aggregates.lookup("documentation", "documentation", "_id", "documentation"),
            Aggregates.lookup("upload_file", "picture", "_id", "upload_file")
        )

        pipeline.addAll(variableFilters)

        while (cursor.hasNext()) {
            val doc: Document = cursor.next()
            pipeline[0] = Aggregates.match(Filters.eq("documentation", doc["_id"]))
            val projectDocument: Document? = mongoCollectionProjects.aggregate(pipeline).first()

            if (!projectDocument.isNullOrEmpty()) {
                var authors: List<PersonRefDTO>
                var supervisors: List<PersonRefDTO>
                val documentation = listOf<DocumentationDTO>()
                var organization: OrganizationRefDTO
                var project: ProjectDTO
                var pictureUrl: String?
                var recommendations: List<ProjectRecommendationDTO>
                var projectToCompareKeywords: List<KeywordDTO>

                projectToCompareKeywords = projectDocument.getList("keywords", Document::class.java).map {
                    KeywordDTO("",
                            it.get("name", String::class.java),
                            it.get("score", Integer::class.java).toDouble()
                    )
                }

                authors = projectDocument.getList("authors", Document::class.java).map {
                    PersonRefDTO(
                        it["_id"].toString(),
                        it.get("full_name", String::class.java),
                        it.get("username", String::class.java),
                        null
                    )
                }
                supervisors = projectDocument.getList("supervisors", Document::class.java).map {
                    PersonRefDTO(
                        it["_id"].toString(),
                        it.get("full_name", String::class.java),
                        it.get("username", String::class.java),
                        null
                    )
                }
                organization = OrganizationRefDTO(
                    projectDocument.getList("organization", Document::class.java)[0]["_id"].toString(),
                    projectDocument.getList("organization", Document::class.java)[0]["display_name"].toString()
                )
                pictureUrl = projectDocument.getList("upload_file", Document::class.java)
                    .firstOrNull()
                    ?.get("url")
                    ?.toString()
/*
                recommendations = projectDocument.getList("recommendations", Document::class.java).map {
                    RecommendationDTO(
                            id = it["_id"].toString(),
                            project_keywords = projectToCompareKeywords
                    )
                }
                project = ProjectDTO(
                    id = projectDocument["_id"].toString(),
                    title = projectDocument.get("title", String::class.java),
                    description = projectDocument.get("description", String::class.java),
                    extraContent = projectDocument.get("extra_content", String::class.java),
                    creationDate = LocalDate.parse(projectDocument["creation_date"].toString()),
                    pictureUrl = pictureUrl,
                    authors = authors,
                    supervisors = supervisors,
                    tags = projectDocument.getList("tags", String::class.java),
                    documentation = documentation,
                    organization = organization,
                    recommendations = recommendations,
                    project_keywords = projectDocument["keywords"] as List<KeywordDTO>
                )

                projects.add(project)
*/            }
        }

        mongoClient.close()

        return projects.toMutableList()
    }

    private fun createVariableFilters(from: String?, to: String?, nameContains: String?, category: String?): List<Bson> {
        val filters: MutableList<Bson> = mutableListOf()
        if (!from.isNullOrEmpty()) {
            filters.add(Aggregates.match(Filters.gte("creation_date", from)))
        }
        if (!to.isNullOrEmpty()) {
            filters.add(Aggregates.match(Filters.lte("creation_date", to)))
        }
        if (!nameContains.isNullOrEmpty()) {
            filters.add(Aggregates.match(Filters.regex("title", ".*$nameContains.*")))
        }
        if (!category.isNullOrEmpty()) {
            filters.add(Aggregates.match(Filters.gte("category", category)))
        }
        return filters
    }

    fun findRecommendedProjects(updatedProject: ProjectDTO): List<ProjectRecommendationDTO>  {
        val mongoClient = startConnection()
        val mongoCollectionProjects = mongoClient.getDatabase(databaseName).getCollection(projectsCollection)
        val keywords = updatedProject.project_keywords

        val keywordsNames = keywords.map { k -> k.name }

        val projects = mutableSetOf<ProjectRecommendationDTO>()

        val pipeline = mutableListOf(
                Aggregates.lookup("keywords", "project_keywords", "_id", "keywords"),
                Aggregates.match(
                    Filters.and(
                        Filters.elemMatch("keywords", Filters.`in`(
                                "name",
                                keywordsNames
                        )),
                        Filters.not(
                            Filters.eq("_id", updatedProject.id)
                        )
                    )
                ),
                Aggregates.out("projects")
        )

        val aggregate: AggregateIterable<Document> = mongoCollectionProjects.aggregate(pipeline)

        val cursor = aggregate.cursor()

        while (cursor.hasNext()) {
            val projectDocumentToCompare: Document = cursor.next()

            val aggregate: AggregateIterable<Document> = mongoCollectionProjects.aggregate(pipeline)
            val projectDocument: Document? = aggregate.first()
            if (!projectDocument.isNullOrEmpty()) {

                val projectToCompareKeywords = projectDocument.getList("keywords", Document::class.java).map {
                    KeywordDTO(
                            it.get("id", String::class.java),
                            it.get("name", String::class.java),
                            it.get("score", Integer::class.java).toDouble()
                    )
                }

                val project = ProjectRecommendationDTO(
                        id = projectDocumentToCompare["_id"].toString(),
                        project_keywords = projectToCompareKeywords
                )

                projects.add(project)
            }
        }

        mongoClient.close()

        return projects.toMutableList()
    }
}