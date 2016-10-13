Lab Server Reservation Ssytem
=============================

Node, Express, AngularJS Microservice app for handling the reservation of lab servers 


## Prerequisties

If you only want to install and run the application, then all you need is 

- [Docker] (https://docs.docker.com/engine/installation/)
- [Docker Compose] (https://docs.docker.com/compose/install/)
- [git] (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

For doing development work, you will need to have these installed in your
environment.

- [Node/Npm] (https://nodejs.org/en/download/)

 *use the latest node
 *might need to run under sudo
 *might need modification to your path

## Get the Source Code
```
git clone ssh://${LOGNAME}@gerrit.eng.vmware.com:29418/q3-team06 && scp -p -P 29418 ${LOGNAME}@gerrit.eng.vmware.com:hooks/commit-msg q3-team06/.git/hooks/
```

## Build, Run, and Stop
Use docker-compose as follows:

Build & Start  (add `-d` optionally to run in background):
```
export SERVER_SERVICE_PORT=$DOCKER_HOST
docker-compose up --build
```
_Note: if you do not have a DOCKER_HOST environment variable set, you should replace `$DOCKER_HOST` above with your host machine's ip address._

Stop
```
docker-compose stop
```

Remove stopped containers
```
docker-compose rm
```

## Services

The system consists of several services that persists and provide specialized functionality for its domain.

#### Server-Service
This service provides a rest api to add new servers, retrieve an array of servers, or delete a server.
It is setup to run on port 8081 for development and **8091** in the default docker container
http://localhost:8091/api/servers

GET: /api/servers

POST: /api/servers
{
  "name": "serverName",
  "description": "Some info on the server"
}

DELETE: /api/servers/{serverName}

#### Approval-Service
The approval service provides a rest api to create an approval for a server reservation. 
It will also retrieve a list of approvals and delete it.

It is setup to run on port 8081 for development and **8092** in the default docker container
http://localhost:8091/api/approvables/

GET: /api/approvables

POST: /api/approvables
{
  "name": "serverName",
  "date": "YYYYMMDD",
  "user": "First Last",
  "email": "flast@email.com"
}

DELETE: /api/approvables/{id}


#### Reservation-Service
The reservation service makes calls to the approval and server services and merges
the data into a format easy to use by the UI.  It also filters out any dead approvals
for servers no longer in the system.
It creates a pending reservation by placing the reservation request into an
approval queue for approval processing.
It is setup to run on port 8081 for development and **8093** in the default docker container
http://localhost:8093/api/reservations


GET: /api/reservations

POST: /api/reservations
{
  "name": "First Last",
  "start_date": "YYYYMMDD",
  "end_date": "YYYYMMDD",
  "server_name": "serverName"
}

#### Reservation-App
This is the UI application for the lab server reservation system.
It interfaces with the reservation system to manage the servers and reservations.
It is setup to run on port 8081 for development and **8090** in the default docker container
http://localhost:8090/app