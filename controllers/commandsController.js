const express = require('express')
const router = new express.Router()

const chatHandler = require('./../modules/chatHandler')
const reportsHandler = require('./../modules/reportsHandler')

router.post('/commands', function (req, res) {
    const action = req.body.text

    const isReport = /^campaign:report:.*/.test(action)
    let command
    if (isReport) {
        command = action.substring(0, ('campaign:report').length)
    } else {
        command = action
    }

    switch (command) {
    case 'campaign:test': {
        sendChatMessageToTestUser()
        res.send('Starting campaign')
        break
    }
    case 'campaign:start': {
        sendChatMessageToTestUsers()
        res.send('Starting campaign')
        break
    }
    case 'campaign:list': {
        generateCampaignsReport(req, res)
        break
    }
    case 'campaign:report': {
        const campaignId = action.substring(('campaign:report:').length, action.length)
        generateCampaignReport(campaignId, req, res)
        break
    }
    default: {
        res.send('You have to pick action')
    }
    }
})

const sendChatMessageToTestUser = () => {
    const campaignId = 'C' + Date.now()
    chatHandler.sendMoodMessage(campaignId, process.env.TEST_USER)
}

const sendChatMessageToTestUsers = () => {
    chatHandler.sendMultipleMoodMessages()
}

const generateCampaignsReport = (req, res) => {
    reportsHandler.getReportNames().then(reportsNames => {
        const response = reportsNames.map(reportsHandler.getCampaignDate).map(function(reportDate, index) {
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

module.exports = router
