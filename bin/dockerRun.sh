#!/bin/bash

if [ -z ${TEAM} ]; then export TEAM="team6";fi
project_dir=$(dirname $(dirname "${BASH_SOURCE[0]}"))

${project_dir}/server-service/bin/dockerServiceRun.sh
${project_dir}/approval-service/bin/dockerServiceRun.sh
${project_dir}/reservation-service/bin/dockerServiceRun.sh

${project_dir}/reservation-app/bin/dockerAppRun.sh


