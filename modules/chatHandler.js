const Slack = require('slack-node')
const attachmentsResolver = require('./attachmentsResolver')
const slack = new Slack(process.env.API_TOKEN)

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
const testUserGroup = () => getUsersList().then(filterActiveUsers).then(printUsers)

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
      username: process.env.BOT_NAME,
      as_user: false,
      channel: '@' + user,
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
    const userData = data.response.members[index]
    if(!userData.is_bot && !userData.deleted && !userData.is_restricted) {
      slackUsername = data.response.members[index].name;

      if (!process.env.IS_PROD_ENV) {
        if (slackUsername === process.env.TEST_USER) {
          users.push(slackUsername)
        }
      } else {
        users.push(slackUsername)
      }
    }
  }
  return users
}

printUsers = (users) => {
  console.log(JSON.stringify(users))
}

module.exports = {
  getEncodedReport,
  sendMoodMessage,
  sendMultipleMoodMessages,
  testUserGroup
}
