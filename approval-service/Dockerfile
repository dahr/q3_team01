FROM uwehale/alpine-node-bower-git:latest
MAINTAINER Uwe hale "uwehale@gmail.com"


WORKDIR /home/app

COPY . /home/app

RUN npm run clean

RUN npm install

EXPOSE 8092

CMD [ "npm", "start"]

