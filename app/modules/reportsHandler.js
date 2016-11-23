const firebase = require('firebase')
const configResolver = require('./configResolver.js')
const firebaseConfig = {
  apiKey: configResolver.getConfigVariable("FIRE_API_KEY"),
  authDomain: configResolver.getConfigVariable("FIRE_AUTH_DOMAIN"),
  databaseURL: configResolver.getConfigVariable("FIRE_DB_URL"),
  storageBucket: configResolver.getConfigVariable("FIRE_STORAGE_BUCKET"),
  messagingSenderId: configResolver.getConfigVariable("FIRE_SENDER_ID")
}
firebase.initializeApp(firebaseConfig)

const getReportNames = () => getReports().then(extractNames)
getReports = () => {
  return firebase.database().ref('/votes').once('value').then(snapshot => {
    return snapshot.val() || []
  })
}

extractNames = (reports) => {
  names = []
  for (var name in reports) {
    names.push(name)
  }
  return names
}

getCampaignDate = (campaignName) => {
  var date = new Date(parseInt(campaignName.substring(1, campaignName.lenght)))
  return date.toDateString()
}

module.exports = {
  getReports,
  getReportNames,
  getCampaignDate
}


// rest

function writeVoteData(id, mood, campaign) {
  firebase.database().ref('votes/' + campaign + '/' + id).set({
    mood: mood,
    date: Date.now()
  })
}

function signInWithEmailPass(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code
    var errorMessage = error.message
  })
}

function readVotes(votes) {
  for (var campaign in votes) {
    var dateNow = parseInt(campaign.substring(1, campaign.lenght))
    date = new Date(dateNow)
    var dateOfCampaign = date.toDateString()

    console.log('Campaign date : ' + dateOfCampaign)
    campaignCollection = votes[campaign]
    for (var userId in campaignCollection) {
      console.log(slackUsers[userId] + ' ' + campaignCollection[userId].mood)
    }
  }
}
