const reportsHandler = require('./../modules/reportsHandler')

exports.generateReport = (req, res) => {
  reportsHandler.getReportNames().then(reportsNames => {
    response = reportsNames.map(reportsHandler.getCampaignDate).map(function(reportDate, index) {
      return reportDate + ' : ' + reportsNames[index]
    })
    res.send('Available campaigns:' + response)
  })
}
