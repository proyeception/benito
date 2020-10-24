package com.github.proyeception.benito.config

import com.github.proyeception.benito.storage.*
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

    @Bean
    open fun customizationStorage(
        mongoTemplate: MongoTemplate
    ) = CustomizationStorage(mongoTemplate)

    @Bean
    open fun driveStorage(
        mongoTemplate: MongoTemplate
    ) = DriveStorage(mongoTemplate)

    @Bean
    open fun statsStorage(
        mongoTemplate: MongoTemplate
    ) = StatsStorage(mongoTemplate)
}