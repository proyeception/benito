package com.github.proyeception.benito.injection

import com.github.proyeception.benito.utils.SparkLoggingFilter
import com.google.inject.AbstractModule
import com.google.inject.Provides
import com.google.inject.Singleton

class LoggingModule : AbstractModule() {
    @Provides
    @Singleton
    fun loggingFilter(): SparkLoggingFilter = SparkLoggingFilter()
}