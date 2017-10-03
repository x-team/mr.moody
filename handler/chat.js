import Slack from 'slack-node'
import attachmentsResolver from './../resolver/attachments'
import { getUsers, filterActiveUsers } from './api/slack'

const slack = new Slack(process.env.API_TOKEN)
const slackBot = new Slack(process.env.BOT_TOKEN)

const listUsersMethod = 'users.list'
const chatPostMessageMethod = 'chat.postMessage'

const getEncodedReport = (report) => getUsersList(report).then(encodeUsers)
const sendMultipleMoodMessages = () => getUsersList().then(filterActiveUsers).then(sendMoodMessages)
const testUserGroup = () => getUsers().then(filterActiveUsers).then(printUsers)

const encodeUsers = (response) => {
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

const sendMoodMessage = (campaignId, user) => {
  attachments = attachmentsResolver.getAttachments(campaignId)
  return new Promise((resolve, reject) => {
    slackBot.api(chatPostMessageMethod, {
      username: process.env.BOT_NAME,
      as_user: true,
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

const sendMoodMessages = (users) => {
  campaignId = 'C' + Date.now()
  for (var index in users) {
    sendMoodMessage(campaignId, users[index])
  }
}

const printUsers = (users) => {
  console.log(JSON.stringify(users))
}

export {
  getEncodedReport,
  sendMoodMessage,
  sendMultipleMoodMessages,
  testUserGroup
}
