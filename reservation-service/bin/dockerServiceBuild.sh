#!/bin/bash

service_name="reservation-service"

if [ -z ${TEAM} ]; then TEAM="team6";fi
project_dir=$(dirname $(dirname "${BASH_SOURCE[0]}"))

echo Building ${service_name} Docker image for ${TEAM} from ${project_dir}

docker build -t ${TEAM}/${service_name} ${project_dir}
