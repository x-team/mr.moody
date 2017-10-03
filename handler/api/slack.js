import Botkit from 'botkit'
import { getAttachments } from './../../resolver/attachments'

const controller = Botkit.slackbot()
const bot = controller.spawn({
  token: process.env.BOT_TOKEN
})

const getEncodedReport = (report) => getUsers(report).then(encodeUsers)

const getUsers = (report) => {
  return new Promise((resolve, reject) => {
    bot.api.users.list({}, (err, response) => {
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

const filterActiveUsers = (data) => {
  let users = []
  for (var index in data.response.members){
    const userData = data.response.members[index]
    if(!userData.is_bot && !userData.deleted && !userData.is_restricted) {
      const slackUsername = data.response.members[index].name;

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

const sendMoodMessage = (campaignId, user) => {
  const attachments = getAttachments(campaignId)
  return new Promise((resolve, reject) => {
    bot.api.chat.postMessage({
      username: process.env.BOT_NAME,
      as_user: true,
      channel: '@' + user,
      attachments: attachments
    }, (err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
}

const encodeUsers = (response) => {
  let encodedReport = []
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

export {
  getUsers,
  filterActiveUsers,
  sendMoodMessage,
  encodeUsers,
  getEncodedReport
}
