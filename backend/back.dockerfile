FROM node:lts-alpine

COPY . /app

WORKDIR /app

RUN apk update && apk upgrade

EXPOSE 8080

ENTRYPOINT [ "/bin/sh", "-c", "yarn && node index.js" ]