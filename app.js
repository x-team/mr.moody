import express from 'express'
import bodyParser from 'body-parser'
import router from './controller'
import { testUserGroup } from './handler/chat'
import { mondayNoonJob, friday5PMCronJob } from './util/cron'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', router)

const port = process.env.PORT || 3000
app.listen(port)

mondayNoonJob()
friday5PMCronJob()
