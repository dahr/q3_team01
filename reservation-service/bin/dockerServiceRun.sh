#!/bin/bash

service_name="reservation-service"
default_port="8093"

#look for defined vars for the team name and port
#else set to defaults
if [ -z ${TEAM} ]; then TEAM="team6";fi
if [ -z ${RESERVATION_SERVICE_PORT} ]; then RESERVATION_SERVICE_PORT=${default_port};fi


project_dir=$(dirname $(dirname "${BASH_SOURCE[0]}"))

echo Starting ${service_name} Docker image for ${TEAM} from ${project_dir} on Port:${RESERVATION_SERVICE_PORT}

docker run --link team6-server-service:server-service --link team6-approval-service:approval-service  -p${RESERVATION_SERVICE_PORT}:8093 --name "${TEAM}-${service_name}" -d ${TEAM}/${service_name}
