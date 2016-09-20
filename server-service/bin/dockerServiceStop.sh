#!/bin/bash

service_name="server-service"


#look for defined vars for the team name and port
#else set to defaults
if [ -z ${TEAM} ]; then TEAM="team6";fi


project_dir=$(dirname $(dirname "${BASH_SOURCE[0]}"))

echo "Stopping ${service_name} Docker image for ${TEAM} from ${project_dir}"

container_id=`docker ps -aqf name="${TEAM}-${service_name}"`


echo "Stopping Docker ID:${container_id}"
docker stop ${container_id}

echo "Removing Docker ID:${container_id}"
docker rm ${container_id}

docker ps
