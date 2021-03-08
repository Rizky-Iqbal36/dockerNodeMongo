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
mongoose
  .connect(connectionstring, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .catch(err => {
    console.log('Mongo not connected')
    console.log(err)
  })

app.use(express.json())
app.use(cors())
app.use('/api/cat', router)
app.get('/', (req, res) => {
  res.send('your app is running on docker container')
})

app.listen(port, () => console.log(`Listening on port ${port}`))
