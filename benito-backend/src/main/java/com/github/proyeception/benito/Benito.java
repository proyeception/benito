package com.github.proyeception.benito;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Collections;

@SpringBootApplication
public class Benito {
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(Benito.class);
        Config config = ConfigFactory.load();
        app.setDefaultProperties(
            Collections.singletonMap(
                "server.port", config.hasPath("server.port") ? config.getString("server.port") : 8080
            )
        );

        SpringApplication.run(Benito.class);
    }
}
