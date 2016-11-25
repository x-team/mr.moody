const chatHandler = require('./../modules/chatHandler')
const configResolver = require('./../modules/configResolver')

sendChatMessageToTestUser = () => {
  campaignId = 'C' + Date.now()
  chatHandler.sendMoodMessage(campaignId, configResolver.getConfigVariable('TEST_USER'))
}

sendChatMessageToTestUsers = () => {
  chatHandler.sendMultipleMoodMessages()
}

module.exports = {
  sendChatMessageToTestUser,
  sendChatMessageToTestUsers
}
