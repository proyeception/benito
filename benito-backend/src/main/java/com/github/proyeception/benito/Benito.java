package com.github.proyeception.benito;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Collections;

@SpringBootApplication
public class Benito {
    private static final String SERVER_PORT = "server.port";

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(Benito.class);
        Config config = ConfigFactory.load();
        app.setDefaultProperties(
            Collections.singletonMap(
                SERVER_PORT, config.hasPath(SERVER_PORT) ? config.getString(SERVER_PORT) : "9290"
            )
        );
        app.run(args);
    }
}
