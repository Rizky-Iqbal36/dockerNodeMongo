const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router = require('./src/routes/router')
const cors = require('cors')
require('dotenv').config()
const { SERVER_PORT, MONGO_HOST, MONGO_USERNAME, MONGO_PASSWORD } = process.env
const port = SERVER_PORT || 3000
const connectionstring = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}${MONGO_HOST}`
console.log(connectionstring)
mongoose.connect(`${process.env.MONGO_DB_URI}/${process.env.MONGO_DB_DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.MONGO_DB_USER,
  pass: process.env.MONGO_DB_PASS,
  authSource: process.env.MONGO_DB_AUTH_SOURCE,
  useFindAndModify: false,
  useCreateIndex: true
})

app.use(express.json())
app.use(cors())
app.use('/api/cat', router)
app.get('/', (req, res) => {
  res.send('your app is running on docker container')
})

app.listen(port, () => console.log(`Listening on port ${port}`))
