server-service
==============

Node, Express Microservice system for handling the lab servers" 


## Prerequisties

If you only want to install and run the application, then all you need is 

- [Docker] (https://docs.docker.com/engine/installation/)
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
You can now build and run the app in a docker container using the Dockerfile. 
See contents of bash scripts for examples to manually run docker commands

```
./bin/dockerServiceBuild.sh
```

```
./bin/dockerServiceRun.sh
```

```
./bin/dockerServiceStop.sh
```




## Development Setup

Run the node package manager install script.  This will download all node dependencies in the package.json.

#### Server
```
npm install
```

## Startup

There are several npm run tasks defined in the 'scripts' section of
package.json.  Some are for the UI client code and others for the node 
express server code

**Start** - This will start the node server 
```
npm start
```

**Monitor** - will use nodemon instead of node to automatically restart
the node server when any files are changed during development.  It requires
[nodemon](http://nodemon.io) to be installed in your development environment.
```
npm run monitor
```


## Service

Api (port 8081 for dev, 8091 for Dockerfile)
```
[GET, POST] http://localhost:8091/api/servers
```


