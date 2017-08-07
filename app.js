const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = require('./controllers')
const version = 'v.0.0.14'
const chatHandler = require('./modules/chatHandler')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', router);

var port = process.env.PORT || 8080
app.listen(port, function() {
  console.log('listening on port ' + port)
  console.log('version: ' + version)
  console.log('C' + Date.now())
});

chatHandler.testUserGroup()
