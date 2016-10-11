        #!/bin/bash

service_name="server-service"
default_port="8091"
message_service="messaging-service"

#look for defined vars for the team name and port
#else set to defaults
if [ -z ${TEAM} ]; then TEAM="team1";fi
if [ -z ${SERVER_SERVICE_PORT} ]; then SERVER_SERVICE_PORT=${default_port};fi


project_dir="$(dirname $(cd -P -- "$(dirname -- "$0")" && pwd -P))"

echo Starting ${service_name} Docker image for ${TEAM} from ${project_dir} on Port:${SERVER_SERVICE_PORT}

docker run --link team1-${message_service}:${message_service}  \
 -p ${SERVER_SERVICE_PORT}:${default_port} \
--name "${TEAM}-${service_name}" \
-d ${TEAM}/${service_name}


