package com.github.proyeception.benito.config

import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoClients
import com.typesafe.config.Config
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.core.MongoTemplate

@Configuration
open class MongoConfig {
    @Bean
    open fun mongo(
        config: Config
    ): MongoClient {
        val mongoConfig = config.getConfig("storage")

        val user = mongoConfig.getString("user")
        val password = System.getenv("STORAGE_PASSWORD") ?: mongoConfig.getString("password")
        val host = mongoConfig.getString("host")
        val databaseName = mongoConfig.getString("db.name")
        val srv = mongoConfig.getBoolean("srv")
        val string = "mongodb${if(srv) "+srv" else ""}://"


        val connectionString = ConnectionString(
            "$string$user:$password@$host/$databaseName?retryWrites=true"
        )
        val mongoClientSettings = MongoClientSettings.builder()
            .applyConnectionString(connectionString)
            .build()
        return MongoClients.create(mongoClientSettings)
    }

    @Bean
    open fun mongoTemplate(
        mongo: MongoClient,
        config: Config
    ): MongoTemplate? {
        return MongoTemplate(mongo, config.getString("storage.db.name"))
    }
}
