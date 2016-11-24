const reportsHandler = require('./../modules/reportsHandler')
const chatHandler = require('./../modules/chatHandler')

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

module.exports = {
  generateCampaignReport,
  generateCampaignsReport
}
