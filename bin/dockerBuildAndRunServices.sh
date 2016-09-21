#!/bin/bash

if [ -z ${TEAM} ]; then export TEAM="team6";fi
bin_dir=$(dirname "${BASH_SOURCE[0]}")


${bin_dir}/dockerBuildServices.sh
${bin_dir}/dockerRunServices.sh
echo ""
echo "**************** Try Me ****************"
echo "http://localhost:8091/api/servers"
echo "http://localhost:8092/api/approvables"
echo "http://localhost:8093/api/reservations"
echo
echo "run dockerStop.sh to stop and remove the containers"
echo ""