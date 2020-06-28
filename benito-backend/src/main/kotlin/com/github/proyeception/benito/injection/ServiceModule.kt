package com.github.proyeception.benito.injection

import com.github.proyeception.benito.connector.Connector
import com.github.proyeception.benito.service.SapiensService
import com.google.inject.AbstractModule
import com.google.inject.Provides
import com.google.inject.Singleton
import com.google.inject.name.Named

class ServiceModule : AbstractModule() {
    @Provides
    @Singleton
    @Named("sapiens")
    fun sapiens(
        @Named("sapiensConnector") sapiensConnector: Connector
    ): SapiensService = SapiensService(sapiensConnector)
}