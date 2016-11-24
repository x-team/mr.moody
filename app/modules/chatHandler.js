const Slack = require('slack-node')
const configResolver = require('./configResolver')
const listUsersMethod = 'users.list'
const slack = new Slack(configResolver.getConfigVariable('API_TOKEN'))

getUsersList = (report) => {
  return new Promise((resolve, reject) => {
    slack.api(listUsersMethod, {}, function(err, response) {
      if (err) {
        reject(err)
      } else {
        resolve({response: response, report: report})
      }
    })
  })
}

const getEncodedReport = (report) => getUsersList(report).then(encodeUsers)

encodeUsers = (response) => {
  encodedReport = []
  for(var index in response.response.members) {
    if(!response.response.members[index].is_bot
      && !response.response.members[index].deleted
      && response.report[response.response.members[index].id]) {
        encodedReport.push({
          name: response.response.members[index].name,
          mood: response.report[response.response.members[index].id]
        })
      }
  }
  return encodedReport
}

module.exports = {
  getEncodedReport
}
