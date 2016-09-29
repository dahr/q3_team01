reservation-app
======================

Node, Express AngularJS User Interface application for handling the lab servers" 


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


http://localhost:8090/app

```
./bin/dockerAppBuild.sh
```

```
./bin/dockerAppRun.sh
```

```
./bin/dockerAppStop.sh
```




## Development Setup

Run the node package manager install script.  This will download all node dependencies in the package.json.

#### Server
```
npm install
```
