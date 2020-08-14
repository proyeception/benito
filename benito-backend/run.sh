#!/bin/bash

java -Dconfig.file=src/main/resources/application.conf -Dlogback.configurationFile=environments/test/logback.xml -jar target/benito-jar-with-dependencies.jar
