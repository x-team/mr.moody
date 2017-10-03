import express from 'express'
import bodyParser from 'body-parser'
import router from './controller'
import { mondayNoonJob, friday5PMCronJob } from './util/cron'
import { sendMultipleMoodMessages, getEncodedReport } from './handler/chat'
import { getCampaignReport } from './handler/reports'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', router)

const port = process.env.PORT || 3000
app.listen(port)

const generateCampaignReport = (campaignId) => {
  getCampaignReport(campaignId).then(report => {
    getEncodedReport(report).then(encodedReport => {
      console.log(encodedReport)
    })
  })
}

mondayNoonJob(generateCampaignReport('C1479487474743'))
friday5PMCronJob(sendMultipleMoodMessages)
