const validationMiddleware = require('./middleware/validationMiddleware')
const errorMiddleware = require('./middleware/errorMiddleware')
const reportsController = require('./reportsController')
const express = require('express')
const router = new express.Router()

router.use(validationMiddleware.validateRequest)
router.use(errorMiddleware.errorMiddleware)
router.post('/slack-command', function (req, res) {
  action = req.body.text

  // extract campaign report
  isReport = /^campaign\:report\:.*/.test(action)
  if (isReport) {
    command = action.substring(0, ('campaign:report').length)

  } else {
    command = action
  }
  //

  switch (command) {
    case "campaign:start":
      console.log('starting campaign ...')
      res.send('Starting campaign')
      break;
    case "campaign:list":
      console.log('showing campaign list ...')
      reportsController.generateCampaignsReport(req, res);
      break;
    case "campaign:report":
      // extract campaign id
      campaignId = action.substring(('campaign:report:').length, action.length)
      //
      reportsController.generateCampaignReport(campaignId, req, res)
      break;
    default:
      res.send('You have to pick action')
  }
})

module.exports = router;
