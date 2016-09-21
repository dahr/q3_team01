#!/bin/bash

service_name="approval-service"
default_port="8092"

#look for defined vars for the team name and port
#else set to defaults
if [ -z ${TEAM} ]; then TEAM="team6";fi
if [ -z ${APPROVAL_SERVICE_PORT} ]; then APPROVAL_SERVICE_PORT=${default_port};fi


project_dir=$(dirname $(dirname "${BASH_SOURCE[0]}"))

echo Starting ${service_name} Docker image for ${TEAM} from ${project_dir} on Port:${APPROVAL_SERVICE_PORT}

docker run -p${APPROVAL_SERVICE_PORT}:8092 --name "${TEAM}-${service_name}" -d ${TEAM}/${service_name}
