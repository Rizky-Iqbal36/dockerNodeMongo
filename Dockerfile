FROM node:12-alpine as base

ENV NODE_ENV=local

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest
RUN npm install

COPY . ./

RUN npm run test

FROM base as dev

RUN npm install

COPY . .

CMD [ "npm","start"]