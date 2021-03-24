const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router = require('./src/routes/router')
const cors = require('cors')
require('dotenv').config()
const { NODE_ENV, PORT, MONGO_DB_CLOUD_HOST, MONGO_DB_CLOUD_USERNAME, MONGO_DB_CLOUD_PASSWORD } = process.env
const dbName = NODE_ENV === 'test' ? 'test_db' : 'prod_db'
const port = PORT || 3000
console.log(`${MONGO_DB_CLOUD_HOST}/${dbName}`)
mongoose.connect(`${MONGO_DB_CLOUD_HOST}/${dbName}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: MONGO_DB_CLOUD_USERNAME,
  pass: MONGO_DB_CLOUD_PASSWORD,
  useFindAndModify: false,
  useCreateIndex: true
})
app.use(express.json())
app.use(cors())
app.use('/api/cat', router)
app.get('/', (req, res) => {
  res.send('your app is running')
})

app.listen(port, () => console.log(`Listening on port ${port}`))
