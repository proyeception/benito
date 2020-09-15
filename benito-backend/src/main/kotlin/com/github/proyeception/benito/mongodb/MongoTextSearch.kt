package com.github.proyeception.benito.mongodb

import com.mongodb.MongoClientURI
import com.mongodb.client.MongoCursor
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Projections
import org.bson.Document
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component


@Component
open class MongoTextSearch{
    @Value("\${spring.data.mongodb.username}")
    private val user: String? = null

    @Value("\${spring.data.mongodb.database}")
    private val databaseName: String? = null

    @Value("\${spring.data.mongodb.password}")
    private val password: String? = null

    @Value("\${spring.data.mongodb.host}")
    private val host: String? = null

    @Value("\${spring.data.mongodb.port}")
    private val port = 0

    private val collection:String = "documentations"

    private fun startConection(): com.mongodb.MongoClient {
        val uri = MongoClientURI(
                "mongodb+srv://proyectatest:$password@proyectatest.eklur.mongodb.net/$databaseName?retryWrites=true&w=majority")
        return com.mongodb.MongoClient(uri)
    }

    open fun getDocuments(line: String) {
        val mongoClient = startConection()
        val mongoCollection = mongoClient.getDatabase(databaseName).getCollection(collection)
        val cursor:MongoCursor<Document> = mongoCollection.find(
                Filters.text("\\" + line + "\\"))
                .projection(
                        Projections.fields(
                                Projections.excludeId(),
                                Projections.metaTextScore("score")
                        )
                )
                .sort(Projections.metaTextScore("score"))
                .cursor()

        mongoClient.close()
        while (cursor.hasNext()) {
            val doc: Document = cursor.next()
        }
    }

}