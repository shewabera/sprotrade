
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const util = require('util')
global.TextEncoder = util.TextEncoder
global.TextDecoder = util.TextDecoder
var betsRouter = require('./routes/betsRouter')



const app = express()

app.use(bodyParser.json())
app.use(cors())

//both index.js and things.js should be in same directory
app.use('/api', betsRouter)

app.listen(8080, () => {
  console.log('service listening on port 8080')
})

