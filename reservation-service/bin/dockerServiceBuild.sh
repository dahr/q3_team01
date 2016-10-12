#!/bin/bash

service_name="reservation-service"

if [ -z ${TEAM} ]; then TEAM="team1";fi
project_dir="$(dirname $(cd -P -- "$(dirname -- "$0")" && pwd -P))"

echo Building ${service_name} Docker image for ${TEAM} from ${project_dir}

docker build -t ${TEAM}/${service_name} ${project_dir}
