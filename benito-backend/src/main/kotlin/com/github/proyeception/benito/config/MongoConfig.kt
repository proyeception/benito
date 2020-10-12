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
        val password = mongoConfig.getString("password")
        val host = mongoConfig.getString("host")
        val databaseName = mongoConfig.getString("db.name")

        val connectionString = ConnectionString(
            "mongodb+srv://$user:$password@$host/$databaseName?retryWrites=true&w=majority"
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