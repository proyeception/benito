package com.github.proyeception.benito.mongodb

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.dto.DocumentationDTO
import com.github.proyeception.benito.dto.OrganizationRefDTO
import com.github.proyeception.benito.dto.PersonRefDTO
import com.github.proyeception.benito.dto.ProjectDTO
import com.mongodb.MongoClientURI
import com.mongodb.client.MongoCursor
import com.mongodb.client.model.Aggregates
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Projections
import org.bson.Document
import java.time.LocalDate
import java.time.ZoneId


open class MongoTextSearch(
    private val user: String,
    private val databaseName: String,
    private val password: String,
    private val host: String,
    private val port: Int
) {
    private val collection: String = "documentations"

    private fun startConnection(): com.mongodb.MongoClient {
        val uri = MongoClientURI(
            "mongodb+srv://$user:$password@$host/$databaseName?retryWrites=true&w=majority"
        )
        return com.mongodb.MongoClient(uri)
    }

    open fun getDocuments(line: String): MutableList<ProjectDTO> {
        val mongoClient = startConnection()
        val mongoCollection = mongoClient.getDatabase(databaseName).getCollection(collection)
        val cursor: MongoCursor<Document> = mongoCollection.find(
            Filters.text("\\" + line + "\\"))
            .projection(
                Projections.fields(
                    Projections.metaTextScore("score")
                )
            )
            .sort(Projections.metaTextScore("score"))
            .cursor()

        val projects = mutableListOf<ProjectDTO>()
        val mongoCollectionProjects = mongoClient.getDatabase(databaseName).getCollection("projects")

        //el match siempre tiene que ser primero para mejorar performace
        val pipeline = mutableListOf(Aggregates.match(Filters.eq("documentation", "")), Aggregates.lookup("authors", "authors", "_id", "authors"),Aggregates.lookup("organizations", "organization", "_id", "organization"), Aggregates.lookup("supervisors", "supervisors", "_id", "supervisors"), Aggregates.lookup("documentation", "documentation", "_id", "documentation"))

        while (cursor.hasNext()) {
            val doc: Document = cursor.next()
            pipeline[0] = Aggregates.match(Filters.eq("documentation", doc["_id"]))
            val projectDocument:Document? = mongoCollectionProjects.aggregate(pipeline).first()

            if(!projectDocument.isNullOrEmpty()) {
                var authors:List<PersonRefDTO>
                var supervisors:List<PersonRefDTO>
                var documentation = listOf<DocumentationDTO>()
                var organization:OrganizationRefDTO
                var project: ProjectDTO

                authors = projectDocument.getList("authors", Document::class.java).map { it -> PersonRefDTO(it["_id"].toString(), it.get("full_name", String::class.java), it.get("username",  String::class.java), null) }
                supervisors = projectDocument.getList("supervisors", Document::class.java).map { it -> PersonRefDTO(it["_id"].toString(), it.get("full_name", String::class.java), it.get("username",  String::class.java), null) }
                organization = OrganizationRefDTO(projectDocument.getList("organization", Document::class.java)[0]["_id"].toString(), projectDocument.getList("organization", Document::class.java)[0]["display_name"].toString())
                project = ProjectDTO(projectDocument["_id"].toString(), projectDocument.get("title", String::class.java), projectDocument.get("description", String::class.java), projectDocument.get("extra_content", String::class.java), LocalDate.parse(projectDocument["creation_date"].toString()), null, authors, supervisors, projectDocument.getList("tags", String::class.java), documentation, organization)

                projects.add(project)
            }
        }

        mongoClient.close()

        return projects
    }
}