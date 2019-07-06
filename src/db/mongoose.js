const mongoose = require('mongoose')
const { MONGO_USER, MONGO_PASSWORD, MONGO_URI } = process.env

const options = {
  user: MONGO_USER,
  pass: MONGO_PASSWORD,
  useNewUrlParser: true,
  useCreateIndex: true,
  dbName: "taskApp",
  useFindAndModify: false
}

mongoose.connect(MONGO_URI, options)