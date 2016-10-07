#!/bin/bash

SERVICE_NAME="messaging-service"
ZOOKEEPER_PORT=2181
CONSUMER_PORT=9092
# Make sure that the interface name is correct for the server/desktop that the 
# script is executed from
NETWORK_INTERFACE='ens33'

#look for defined vars for the team name
#else set to defaults
if [ -z ${TEAM} ]; then TEAM="team6";fi

PROJECT_DIR="$(dirname $(cd -P -- "$(dirname -- "$0")" && pwd -P))"

echo Starting ${SERVICE_NAME} Docker image for ${TEAM} from ${PROJECT_DIR} \
on ports ${ZOOKEEPER_PORT} and ${CONSUMER_PORT}


#Get the local IP of the host
#for OSX
LOCAL_IP=`ipconfig getifaddr en0`
#for other
if [ -z ${LOCAL_IP} ]; then LOCAL_IP=`ip -f inet -o addr show ${NETWORK_INTERFACE}|cut -d\  -f 7 | cut -d/ -f 1`;fi

echo ${LOCAL_IP}

docker run -p ${ZOOKEEPER_PORT}:2181 -p ${CONSUMER_PORT}:9092 \
 --env ADVERTISED_HOST=${LOCAL_IP} \
 --env ADVERTISED_PORT=${CONSUMER_PORT} \
--name "${TEAM}-${SERVICE_NAME}" -d ${TEAM}/${SERVICE_NAME}
