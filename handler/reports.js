import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.FIRE_API_KEY,
  authDomain: process.env.FIRE_AUTH_DOMAIN,
  databaseURL: process.env.FIRE_DB_URL,
  storageBucket: process.env.FIRE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIRE_SENDER_ID
}
firebase.initializeApp(firebaseConfig)

const getReportNames = () => getReports().then(extractCampaignNames)

const getCampaignReport = (campaignId) => getReports().then(extractReport).then(extractNameAndMood)

const getReports = () => {
  return firebase.database().ref('/votes').once('value').then(snapshot => {
    return snapshot.val() || []
  })
}

const extractNameAndMood = (report) => {
  votes = []
  for ( var userId in report) {
    votes[userId] = report[userId].mood
  }
  return votes
}

const extractCampaignNames = (reports) => {
  names = []
  for (var name in reports) {
    names.push(name)
  }
  return names
}

const extractReport = (reports) => {
  return reports[campaignId]
}

const getCampaignDate = (campaignName) => {
  var date = new Date(parseInt(campaignName.substring(1, campaignName.lenght)))
  return date.toDateString()
}

const writeVoteData = (id, mood, campaign) => {
  firebase.database().ref('votes/' + campaign + '/' + id).set({
    mood: mood,
    date: Date.now()
  })
}

export {
  getReports,
  getReportNames,
  getCampaignReport,
  getCampaignDate,
  writeVoteData
}
