FROM node:11-alpine

RUN apk update && \
    apk add vim

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

WORKDIR /app

RUN npm install

COPY . /app

CMD ["npm", "run", "start:prod"]
