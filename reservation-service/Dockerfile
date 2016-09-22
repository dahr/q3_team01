FROM uwehale/alpine-node-bower-git:latest
MAINTAINER Uwe hale "uwehale@gmail.com"


WORKDIR /home/app

COPY . /home/app

RUN npm run clean

RUN npm install

EXPOSE 8093

# The run command needs to pass in the linked service name and matching URL
# APPROVAL_SERVICE, SERVER_SERVICE
# example
# --link team6-${server_service}:${server_service} -e SERVER_SERVICE="http://${server_service}:${server_service_port}" \
# --link team6-${approval_service}:${approval_service}  -e APPROVAL_SERVICE='http://${approval_service}:${approval_service_port}' \

CMD [ "npm", "start" ]

