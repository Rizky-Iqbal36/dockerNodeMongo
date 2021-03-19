# Dockerization an express app and mongodb

Note: <br />
this db configuration is for connecting to mongodb replica set on kubernetes <br />

## Running the app

rename or copy .env.example to .env

### With Docker

Note:<br />
you need to change the db connection on server.js before exec this command<br />
see "Local Connect" on .env.example<br />

```console
whoam@i$ docker-compose up
```

### For rebuild

```console
whoam@i$ docker-compose up --build OR
whoam@i$ docker-compose build
```

### With Kubernetes

secure your mongodb kefile <br />

```console
whoam@i$ openssl rand -base64 741 > resources/secret/mongodb-keyfile
```

create kubernetes secret with the mongodb keyfile you just create <br />

```console
whoam@i$ kubectl create secret generic mongo-key --from-file=resources/secret/mongodb-keyfile
```

now you R ready to apply resources/kubernetes/mongodb-statefulset.yaml <br />
wait until all the 3 pods R running <br />
after that you can run this application on kubernetes by apply kubernetes/deploy-app.yaml <br />
Done, the application is running on port 30001

## Use

http://localhost:3000/ for health-check <br />
OR <br />
http://localhost:30001/ if running on kubernetes

## Database Connection

see .env.example for more details

## Endpoints

see src/routes/router.js for endpoints list

## Docker Hub

you can also pull/run(as container) the image for this project on : https://hub.docker.com/r/200140/docker-node-mongo

### ENJOY
