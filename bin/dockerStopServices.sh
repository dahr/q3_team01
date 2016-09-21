#!/bin/bash

if [ -z ${TEAM} ]; then export TEAM="team6";fi
project_dir=$(dirname $(dirname "${BASH_SOURCE[0]}"))


docker ps

${project_dir}/server-service/bin/dockerServiceStop.sh
${project_dir}/approval-service/bin/dockerServiceStop.sh
${project_dir}/reservation-service/bin/dockerServiceStop.sh



