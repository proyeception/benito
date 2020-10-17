package com.github.proyeception.benito.config

import com.github.proyeception.benito.storage.RecommendationStorage
import com.github.proyeception.benito.storage.SessionStorage
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.core.MongoTemplate

@Configuration
open class StorageConfig {
    @Bean
    open fun sessionStorage(
        mongoTemplate: MongoTemplate
    ) = SessionStorage(mongoTemplate)

    @Bean
    open fun recommendationStorage(
        mongoTemplate: MongoTemplate
    ) = RecommendationStorage(mongoTemplate)
}