#!/bin/bash

service_name="testing-service"
reservation_app="reservation-app"

#look for defined vars for the team name and port
#else set to defaults
if [ -z ${TEAM} ]; then TEAM="team1";fi

project_dir="$(dirname $(cd -P -- "$(dirname -- "$0")" && pwd -P))"

echo Starting ${service_name} Docker image for ${TEAM} from ${project_dir}

docker run  \
--link team1-${reservation_app}:${reservation_app} \
--name "${TEAM}-${service_name}" \
-d ${TEAM}/${service_name}
