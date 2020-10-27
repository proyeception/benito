#!/bin/bash

if [ $# -eq 0 ]; then
  echo "Usage: ./run <env>"
  exit -1
fi

set -e

ENVIRONMENT=$1

java -Dconfig.file=benito-backend/environments/"$ENVIRONMENT"/application.conf -Dlogback.configurationFile=benito-backend/environments/"$ENVIRONMENT"/logback.xml -jar benito-backend/target/benito.jar

