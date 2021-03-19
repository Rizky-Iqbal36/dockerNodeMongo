const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router = require('./src/routes/router')
const cors = require('cors')
require('dotenv').config()
const {
  SERVER_PORT,
  MONGO_STATEFULSET_HOST,
  MONGO_STATEFULSET_DB_NAME,
  MONGO_STATEFULSET_USER,
  MONGO_STATEFULSET_PASS,
  MONGO_STATEFULSET_AUTH_SOURCE
} = process.env
const port = SERVER_PORT || 3000
console.log(`${MONGO_STATEFULSET_HOST}/${MONGO_STATEFULSET_DB_NAME}`)
mongoose.connect(`${MONGO_STATEFULSET_HOST}/${MONGO_STATEFULSET_DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: MONGO_STATEFULSET_USER,
  pass: MONGO_STATEFULSET_PASS,
  authSource: MONGO_STATEFULSET_AUTH_SOURCE,
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
