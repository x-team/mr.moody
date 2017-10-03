import express from 'express'
import chatHandler from './../handler/chat'
import reportsHandler from './../handler/reports'

const router = new express.Router()

router.post('/commands', function (req, res) {
  action = req.body.text

  isReport = /^campaign\:report\:.*/.test(action)
  if (isReport) {
    command = action.substring(0, ('campaign:report').length)
  } else {
    command = action
  }

  switch (command) {
    case "campaign:test":
      sendChatMessageToTestUser()
      res.send('Starting campaign')
      break;
    case "campaign:start":
      sendChatMessageToUsers()
      res.send('Starting campaign')
      break;
    case "campaign:list":
      generateCampaignsReport(req, res);
      break;
    case "campaign:report":
      campaignId = action.substring(('campaign:report:').length, action.length)
      generateCampaignReport(campaignId, req, res)
      break;
    default:
      res.send('You have to pick action')
  }
})

const sendChatMessageToTestUser = () => {
  campaignId = 'C' + Date.now()
  chatHandler.sendMoodMessage(campaignId, process.env.TEST_USER)
}

const sendChatMessageToUsers = () => {
  chatHandler.sendMultipleMoodMessages()
}

const generateCampaignsReport = (req, res) => {
  reportsHandler.getReportNames().then(reportsNames => {
    response = reportsNames.map(reportsHandler.getCampaignDate).map(function(reportDate, index) {
      return reportDate + ' : ' + reportsNames[index]
    })
    res.send('Available campaigns:' + response)
  })
}

const generateCampaignReport = (campaignId, req, res) => {
  reportsHandler.getCampaignReport().then(report => {
    chatHandler.getEncodedReport(report).then(encodedReport => {
      res.send(encodedReport)
    })
  })
}

export default router
