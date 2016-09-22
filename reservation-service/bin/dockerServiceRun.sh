#!/bin/bash

service_name="reservation-service"
default_port="8093"

server_service="server-service"
server_service_port="8091"
approval_service="approval-service"
approval_service_port="8092"

#look for defined vars for the team name and port
#else set to defaults
if [ -z ${TEAM} ]; then TEAM="team6";fi
if [ -z ${RESERVATION_SERVICE_PORT} ]; then RESERVATION_SERVICE_PORT=${default_port};fi


project_dir="$(dirname $(cd -P -- "$(dirname -- "$0")" && pwd -P))"

echo Starting ${service_name} Docker image for ${TEAM} from ${project_dir} on Port:${RESERVATION_SERVICE_PORT}

docker run  \
--link team6-${server_service}:${server_service} -e SERVER_SERVICE="http://${server_service}:${server_service_port}" \
--link team6-${approval_service}:${approval_service}  -e APPROVAL_SERVICE="http://${approval_service}:${approval_service_port}" \
-p${RESERVATION_SERVICE_PORT}:${default_port} \
--name "${TEAM}-${service_name}" \
-d ${TEAM}/${service_name}

