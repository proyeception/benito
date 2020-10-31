#!/bin/bash

if [ $# -eq 0 ]; then
  echo "Usage: ./run <env>"
  exit -1
fi

set -e

ENVIRONMENT=$1

java -Dconfig.file=environments/"$ENVIRONMENT"/application.conf -Dspring.config.location=environments/"ENVIRONMENT"/application.properties -Dlogback.configurationFile=environments/"$ENVIRONMENT"/logback.xml -jar target/benito.jar
