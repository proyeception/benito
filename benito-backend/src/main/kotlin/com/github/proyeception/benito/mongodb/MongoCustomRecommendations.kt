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
){
    private val viewedProjectsByUser: String = "user_visits"

    private fun startConnection(): MongoClient {
        val uri = MongoClientURI(
                "mongodb+srv://$user:$password@$host/$databaseName?retryWrites=true&w=majority"
        )
        return MongoClient(uri)
    }

    open fun updateView(projectID: String, userID: String){
        val mongoClient = startConnection()
        val mongoCollection = mongoClient.getDatabase(databaseName).getCollection(viewedProjectsByUser)
        mongoCollection.updateOne(
                Filters.and(
                        Filters.eq("user_id", ObjectId(userID)),
                        Filters.eq("project_id", ObjectId(projectID))
                ),
                Updates.inc("views", 1),
                UpdateOptions().upsert(true)
        )
    }

    open fun getCustomRecommendations(userID: String): MutableList<CustomRecommendationDTO> {
        val mongoClient = startConnection()
        val mongoCollection = mongoClient.getDatabase(databaseName).getCollection(viewedProjectsByUser)
        val refs = mutableListOf<CustomRecommendationDTO>()
        mongoCollection.find(Filters.eq("user_id", ObjectId(userID))).
        forEach { refs.add(CustomRecommendationDTO(it["user_id"].toString(), it["project_id"].toString(), it.get("views", Int::class.java))) }

        refs.sortByDescending { it.views }
        refs.take(10)
        return refs
    }

}