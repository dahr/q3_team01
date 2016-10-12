#!/bin/bash

SERVICE_NAME="messaging-service"
ZOOKEEPER_PORT=2181
CONSUMER_PORT=9092
# Make sure that the interface name is correct for the server/desktop that the 
# script is executed from
NETWORK_INTERFACE='ens33'

#look for defined vars for the team name
#else set to defaults
if [ -z ${TEAM} ]; then TEAM="team1";fi

PROJECT_DIR="$(dirname $(cd -P -- "$(dirname -- "$0")" && pwd -P))"

echo Starting ${SERVICE_NAME} Docker image for ${TEAM} from ${PROJECT_DIR} \
on ports ${ZOOKEEPER_PORT} and ${CONSUMER_PORT}


#Get the local IP of the host
#for OSX
LOCAL_IP=`ipconfig getifaddr en0`
#for other
if [ -z ${LOCAL_IP} ]; then LOCAL_IP=`ip -f inet -o addr show ${NETWORK_INTERFACE}|cut -d\  -f 7 | cut -d/ -f 1`;fi

echo ${LOCAL_IP}

# --env ADVERTISED_HOST=${LOCAL_IP} \
# --env ADVERTISED_PORT=${CONSUMER_PORT} \

docker run -p ${ZOOKEEPER_PORT}:2181 -p ${CONSUMER_PORT}:9092 \
--name "${TEAM}-${SERVICE_NAME}" -d ${TEAM}/${SERVICE_NAME}

# TODO find another way to setup the initial topics
# the topics env var does not seem to create them.
sleep 5

docker exec team1-messaging-service /opt/kafka_2.11-0.8.2.1/bin/kafka-topics.sh --create --zookeeper 10.162.231.12:2181 --replication-factor 1 --partitions 1 --topic TEAM1_APPROVAL_REQUEST
docker exec team1-messaging-service /opt/kafka_2.11-0.8.2.1/bin/kafka-topics.sh --create --zookeeper 10.162.231.12:2181 --replication-factor 1 --partitions 1 --topic TEAM1_SERVERCREATE_REQUEST