const express = require('express')
const router = new express.Router()

const chatHandler = require('./../modules/chatHandler')
const reportsHandler = require('./../modules/reportsHandler')

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
      sendChatMessageToTestUsers()
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

module.exports = router

sendChatMessageToTestUser = () => {
  campaignId = 'C' + Date.now()
  chatHandler.sendMoodMessage(campaignId, process.env.TEST_USER)
}

sendChatMessageToTestUsers = () => {
  chatHandler.sendMultipleMoodMessages()
}

generateCampaignsReport = (req, res) => {
  reportsHandler.getReportNames().then(reportsNames => {
    response = reportsNames.map(reportsHandler.getCampaignDate).map(function(reportDate, index) {
      return reportDate + ' : ' + reportsNames[index]
    })
    res.send('Available campaigns:' + response)
  })
}

generateCampaignReport = (campaignId, req, res) => {
  reportsHandler.getCampaignReport().then(report => {
    chatHandler.getEncodedReport(report).then(encodedReport => {
      res.send(encodedReport)
    })
  })
}
