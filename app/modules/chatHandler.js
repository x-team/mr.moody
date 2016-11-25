const Slack = require('slack-node')
const configResolver = require('./configResolver')
const attachmentsResolver = require('./attachmentsResolver')
const slack = new Slack(configResolver.getConfigVariable('API_TOKEN'))

const listUsersMethod = 'users.list'
const chatPostMessageMethod = 'chat.postMessage'

getUsersList = (report) => {
  return new Promise((resolve, reject) => {
    slack.api(listUsersMethod, {}, function(err, response) {
      if (err) {
        reject(err)
      } else {
        if (report) {
            resolve({response: response, report: report})
        } else {
            resolve({response: response})
        }
      }
    })
  })
}

const getEncodedReport = (report) => getUsersList(report).then(encodeUsers)
const sendMultipleMoodMessages = () => getUsersList().then(filterActiveUsers).then(sendMoodMessages)

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

sendMoodMessage = (campaignId, user) => {
  attachments = attachmentsResolver.getAttachments(campaignId)
  return new Promise((resolve, reject) => {
    slack.api(chatPostMessageMethod, {
      username: configResolver.getConfigVariable('BOT_NAME'),
      as_user: false,
      channel: '@' + user,
      icon_url: configResolver.getConfigVariable('BOT_ICON_URL'),
      attachments: attachments
    }, function(err, response) {
      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
}

sendMoodMessages = (users) => {
  campaignId = 'C' + Date.now()
  for (var index in users) {
    sendMoodMessage(campaignId, users[index])
  }
}

filterActiveUsers = (data) => {
  users = []
  for(var index in data.response.members){
    if(!data.response.members[index].is_bot && !data.response.members[index].deleted) {
      slackUsername = data.response.members[index].name;

      if (!configResolver.getConfigVariable('IS_PROD_ENV')) {
        if (slackUsername === configResolver.getConfigVariable('TEST_USER')) {
          users.push(slackUsername)
        }
      } else {
        users.push(slackUsername)
      }
    }
  }
  return users
}

module.exports = {
  getEncodedReport,
  sendMoodMessage,
  sendMultipleMoodMessages
}
