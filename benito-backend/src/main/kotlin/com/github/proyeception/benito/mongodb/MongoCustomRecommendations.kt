package com.github.proyeception.benito.mongodb

import com.github.proyeception.benito.dto.CustomRecommendationDTO
import com.mongodb.MongoClient
import com.mongodb.MongoClientURI
import com.mongodb.client.model.Filters
import com.mongodb.client.model.UpdateOptions
import com.mongodb.client.model.Updates
import org.bson.types.ObjectId


open class MongoCustomRecommendations(
    private val user: String,
    private val databaseName: String,
    private val password: String,
    private val host: String,
    private val port: Int
) {
    private val viewedProjectsByUser: String = "user_visits"

    private fun startConnection(): MongoClient {
        val uri = MongoClientURI(
            "mongodb+srv://$user:$password@$host/$databaseName?retryWrites=true&w=majority"
        )
        return MongoClient(uri)
    }

    open fun updateUserId(customizationId: String, userId: String) {
        startConnection()
            .getDatabase(databaseName)
            .getCollection(viewedProjectsByUser)
            .updateMany(
                Filters.and(
                    Filters.eq("customization_id", customizationId)
                ),
                Updates.set("user_id", userId),
                UpdateOptions().upsert(true)
            )
    }

    open fun updateView(projectId: String, customizationId: String) {
        val mongoClient = startConnection()
        val mongoCollection = mongoClient.getDatabase(databaseName).getCollection(viewedProjectsByUser)
        mongoCollection.updateOne(
            Filters.and(
                Filters.eq("customization_id", customizationId),
                Filters.eq("project_id", ObjectId(projectId))
            ),
            Updates.inc("views", 1),
            UpdateOptions().upsert(true)
        )
    }

    open fun getCustomRecommendations(token: String): List<CustomRecommendationDTO> = startConnection()
        .getDatabase(databaseName).getCollection(viewedProjectsByUser)
        .find(Filters.eq("customization_id", token))
        .map {
            CustomRecommendationDTO(
                customizationId = it["customization_id"].toString(),
                projectId = it["project_id"].toString(),
                views = it.get("views", Integer::class.java).toInt()
            )
        }
        .toList()
        .sortedBy { it.views }
        .take(10)

}