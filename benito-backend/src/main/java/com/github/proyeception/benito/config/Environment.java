package com.github.proyeception.benito.config;

public enum Environment {
    PROD,
    TEST,
    DEV;

    public boolean isProd() {
        return this == PROD;
    }
}