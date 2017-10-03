import { getUsers, filterActiveUsers, encodeUsers, sendMoodMessage } from './api/slack'

const getEncodedReport = (report) => getUsers(report).then(encodeUsers)
const sendMultipleMoodMessages = () => getUsers().then(filterActiveUsers).then(sendMoodMessages)
const testUserGroup = () => getUsers().then(filterActiveUsers).then(printUsers)

const sendMoodMessages = (users) => {
  const campaignId = 'C' + Date.now()
  for (var index in users) {
    console.log('sending to ...', users[index])
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
