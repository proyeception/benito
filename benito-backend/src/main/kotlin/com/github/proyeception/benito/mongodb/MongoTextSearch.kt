package com.github.proyeception.benito.mongodb

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.dto.ProjectDTO
import com.mongodb.MongoClientURI
import com.mongodb.client.MongoCursor
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Projections
import org.bson.Document
import org.bson.conversions.Bson
import org.bson.types.ObjectId

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
        val a: ObjectMapper = ObjectMapper()

        while (cursor.hasNext()) {
            val doc: Document = cursor.next()
            val project:Document = mongoCollection.find(
                    Filters.eq("documentation", ObjectId(doc.get("_Id", String::class.java))))
                    .first()!!

            projects.add(a.readValue(project.toJson(), ProjectDTO::class.java))
        }

        mongoClient.close()

        return projects
    }
}