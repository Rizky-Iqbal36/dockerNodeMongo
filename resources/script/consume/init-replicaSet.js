rs.initiate({
  _id: 'MainRepSet',
  version: 1,
  members: [
    { _id: 0, host: 'mongod-0.mongodb-service:27017' },
    { _id: 1, host: 'mongod-1.mongodb-service:27017' },
    { _id: 2, host: 'mongod-2.mongodb-service:27017' }
  ]
})