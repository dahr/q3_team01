#!/bin/bash

service_name="reservation-app"
default_port="8090"

#look for defined vars for the team name and port
#else set to defaults
if [ -z ${TEAM} ]; then TEAM="team6";fi
if [ -z ${SERVER_SERVICE_PORT} ]; then SERVER_SERVICE_PORT=${default_port};fi


project_dir=$(dirname $(dirname "${BASH_SOURCE[0]}"))

echo Starting ${service_name} Docker image for ${TEAM} from ${project_dir} on Port:${SERVER_SERVICE_PORT}

docker run --link team6-reservation-service:reservation-service  -p${SERVER_SERVICE_PORT}:8090 --name "${TEAM}-${service_name}" -d ${TEAM}/${service_name}
