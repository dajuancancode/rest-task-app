require('dotenv').config()
require('./db/mongoose')
const express = require('express')

const router = require('./routes/index')

// Configure express 
const app = express()
const port = process.env.PORT || 3000

// const multer = require('multer')
// const upload = multer({
//   dest: 'images'
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//   res.send()
// })

app.use(express.json())
app.use(router)


app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})