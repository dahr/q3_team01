#!/bin/bash

if [ -z ${TEAM} ]; then export TEAM="team1";fi
project_dir="$(dirname $(cd -P -- "$(dirname -- "$0")" && pwd -P))"

docker ps

${project_dir}/reservation-app/bin/dockerAppStop.sh
${project_dir}/reservation-service/bin/dockerServiceStop.sh

${project_dir}/server-service/bin/dockerServiceStop.sh
${project_dir}/approval-service/bin/dockerServiceStop.sh

${project_dir}/messaging-service/bin/dockerServiceStop.sh




