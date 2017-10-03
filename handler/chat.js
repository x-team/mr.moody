import { getUsers, filterActiveUsers, encodeUsers, sendMoodMessage } from './api/slack'

const listUsersMethod = 'users.list'
const chatPostMessageMethod = 'chat.postMessage'

const getEncodedReport = (report) => getUsersList(report).then(encodeUsers)
const sendMultipleMoodMessages = () => getUsersList().then(filterActiveUsers).then(sendMoodMessages)
const testUserGroup = () => getUsers().then(filterActiveUsers).then(printUsers)

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
  sendMultipleMoodMessages,
  testUserGroup
}
