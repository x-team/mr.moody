import {
  getUsers,
  filterActiveUsers,
  sendMoodMessage
} from './api/slack'

const sendMultipleMoodMessages = () => getUsers().then(filterActiveUsers).then(sendMoodMessages)
const testUserGroup = () => getUsers().then(filterActiveUsers).then(printUsers)

const sendMoodMessages = (users) => {
  const campaignId = 'C' + Date.now()
  for (var index in users) {
    sendMoodMessage(campaignId, users[index])
  }
}

const printUsers = (users) => {
  console.log(JSON.stringify(users))
}

export {
  sendMultipleMoodMessages,
  testUserGroup
}
