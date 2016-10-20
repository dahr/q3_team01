FROM uwehale/alpine-node-bower-git-python:latest
MAINTAINER Uwe hale "uwehale@gmail.com"


WORKDIR /home/app

COPY . /home/app

RUN npm run clean

RUN npm install

EXPOSE 8091

CMD [ "/home/app/bin/startWait.sh", "npm", "start"]

