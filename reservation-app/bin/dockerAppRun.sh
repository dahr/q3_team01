#!/bin/bash

service_name="reservation-app"
default_port="8090"

# Services the app is linked to
reservation_service="reservation-service"
reservation_service_port="8093"
server_service="server-service"
server_service_port="8091"

#look for defined vars for the team name and port
#else set to defaults
if [ -z ${TEAM} ]; then TEAM="team6";fi
if [ -z ${RESERVATION_APP_PORT} ]; then RESERVATION_APP_PORT=${default_port};fi


project_dir="$(dirname $(cd -P -- "$(dirname -- "$0")" && pwd -P))"

echo Starting ${service_name} Docker image for ${TEAM} from ${project_dir} on Port:${RESERVATION_APP_PORT}

docker run --link team6-reservation-service:reservation-service  \
--link team6-${reservation_service}:${reservation_service} -e RESERVATION_SERVICE="http://${reservation_service}:${reservation_service_port}" \
-p ${RESERVATION_APP_PORT}:${default_port} \
--name "${TEAM}-${service_name}" \
-d ${TEAM}/${service_name}
