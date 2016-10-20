FROM uwehale/alpine-node-bower-git-python:latest
MAINTAINER Uwe hale "uwehale@gmail.com"


WORKDIR /home/app

COPY . /home/app

RUN npm run clean

RUN npm install

RUN cd client && bower --allow-root install

RUN npm run client

EXPOSE 8081

CMD [ "/home/app/bin/startWait.sh", "npm", "run", "server"]
