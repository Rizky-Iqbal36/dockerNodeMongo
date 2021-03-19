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

### Deployment MongoDB

Note:<br />
you need to change the db connection on server.js before exec this command<br />
see "Kubernetes Deployment" on .env.example<br />

- on secret.example.yaml <br />
  - encode your key value by exec "echo -n yourValue | base64" replace the output to ENCRYPTED_USERNAME<br />
  - do exactly the same to replace ENCRYPTED_PASSWORD<br />
  - now, you R ready to apply secret.example.yaml<br />
- after that, you can apply mongodb-deployment.yaml, mongo ready to use
- login to mongo using the value of MONGO_USERNAME and MONGO_PASSWORD before you encode it

#### Statefulset MongoDB (Replica Set)

secure your mongodb kefile <br />

```console
whoam@i$ openssl rand -base64 741 > resources/secret/mongodb-keyfile
```

create kubernetes secret with the mongodb keyfile you just create <br />

```console
whoam@i$ kubectl create secret generic mongo-key --from-file=resources/secret/mongodb-keyfile
```

- now you R ready to apply resources/kubernetes/mongodb-statefulset.yaml
- wait until all the 3 pods R running
  - define replica set in mongo bash in the running pod
    - by execute "kubectl exec -it mongod-0 -- bash" you can acces the pod bash
    - in pod bash, login to mongo, by execute "mongo -u root -p developer"
    - execute this command to make your own replica set with your own host
      ```javascript
      rs.initiate({
        _id: 'MainRepSet',
        version: 1,
        members: [
          { _id: 0, host: 'mongod-0.mongodb-service:27017' },
          { _id: 1, host: 'mongod-1.mongodb-service:27017' },
          { _id: 2, host: 'mongod-2.mongodb-service:27017' }
        ]
      })
      ```
    - rs.status() to see if there is primary replica set, if not
    - exec "rs.slaveOk() || rs.secondaryOk()" to make host mongod-0.mongodb-service:27017 as primary
      - depend on which pod you are accessing the mongo bash
- after that you can run this application on kubernetes by apply kubernetes/deploy-app.yaml
  - wait until this app's pod is running
- Done, the application is running on port 30001

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
