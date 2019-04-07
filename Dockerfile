FROM node:11-alpine

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

WORKDIR /app

RUN npm ci

COPY . /app

RUN npm run build

CMD ["npm", "run", "start:prod"]
