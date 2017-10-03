import Botkit from 'botkit'

const controller = Botkit.slackbot()
const bot = controller.spawn({
  token: process.env.BOT_TOKEN
})

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
  for(var index in data.response.members){
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

export {
  getUsers,
  filterActiveUsers
}
