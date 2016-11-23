const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const fs = require('fs')
const shortid = require('shortid')
const app = express()
const router = express.Router()

const configResolver = require('./modules/configResolver.js')
const version = 'v.0.0.12'

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const mainController = require('./controllers/mainController')(router)

app.use('/api', router);

var port = process.env.PORT || 8080
app.listen(port, function() {
  console.log('listening on port ' + port)
  console.log('version: ' + version)
});
