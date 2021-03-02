FROM node:12-alpine

ENV NODE_ENV=local

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest
RUN npm install -g mocha
RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]