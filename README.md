# Dockerization an express app and mongodb

Note: <br />
this db configuration is for connecting to mongodb replica set on kubernetes <br />

## Running the app

```console
whoam@i$ docker-compose up
```

### For rebuild

```console
whoam@i$ docker-compose up --build OR
whoam@i$ docker-compose build
```

## Use

http://localhost:3000/ for health-check <br />

## Database Connection

see .env.example for more details

## Endpoints

see src/routes/router.js for endpoints list

## Docker Hub

you can also pull/run(as container) the image for this project on : https://hub.docker.com/r/200140/docker-node-mongo

### ENJOY
