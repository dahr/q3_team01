#!/bin/bash

if [ -z ${TEAM} ]; then export TEAM="team6";fi
project_dir="$(dirname $(cd -P -- "$(dirname -- "$0")" && pwd -P))"


${project_dir}/server-service/bin/dockerServiceBuild.sh
${project_dir}/approval-service/bin/dockerServiceBuild.sh
${project_dir}/reservation-service/bin/dockerServiceBuild.sh

${project_dir}/reservation-app/bin/dockerAppBuild.sh


