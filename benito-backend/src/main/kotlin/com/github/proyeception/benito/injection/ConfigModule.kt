package com.github.proyeception.benito.injection

import com.google.inject.AbstractModule
import com.google.inject.Provides
import com.google.inject.Singleton
import com.typesafe.config.Config
import com.typesafe.config.ConfigFactory

class ConfigModule : AbstractModule() {
    @Provides
    @Singleton
    fun config(): Config = ConfigFactory.load()
}