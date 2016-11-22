var express = require('express');
var bodyParser = require('body-parser');
var Slack = require('slack-node');
var configResolver = require('./modules/configResolver.js');
var https = require('https');
var fs = require('fs');
var firebase = require('firebase');
var shortid = require('shortid');
var campaignId = 'test';

const reportsController = require('./controllers/reports.js');
const validationMiddleware = require('./modules/middleware/validationMiddleware.js');
const errorMiddleware = require('./modules/middleware/errorMiddleware.js');

var postMessageMethod = 'chat.postMessage';
var listUsersMethod = 'users.list';
var slackUsers = [];

var app = express();
const version = 'v.0.0.12';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.use(validationMiddleware.validateRequest)
router.use(errorMiddleware.errorMiddleware)

var firebaseConfig = {
  apiKey: configResolver.getConfigVariable("FIRE_API_KEY"),
  authDomain: configResolver.getConfigVariable("FIRE_AUTH_DOMAIN"),
  databaseURL: configResolver.getConfigVariable("FIRE_DB_URL"),
  storageBucket: configResolver.getConfigVariable("FIRE_STORAGE_BUCKET"),
  messagingSenderId: configResolver.getConfigVariable("FIRE_SENDER_ID")
};
firebase.initializeApp(firebaseConfig);
function writeVoteData(id, mood, campaign) {
  firebase.database().ref('votes/' + campaign + '/' + id).set({
    mood: mood,
    date: Date.now()
  });
}

app.get('/', function(req, res) {

  res.send(version);
});

function getAttachments() {
  var resources_attachemnts = require('./resources/attachments.json');
  resources_attachemnts[0].callback_id = campaignId;

  return JSON.stringify(resources_attachemnts);
}

router.post('/notify', function (req, res) {
		if (req.body.payload) {
			var payload = JSON.parse(req.body.payload);

			if (payload.token == configResolver.getConfigVariable('VERIFICATION_TOKEN')) {
				var mood = payload.actions[0].value;
				var id = payload.user.id;
        var campaign = payload.callback_id;
        writeVoteData(id, mood, campaign);
			} else {
				console.log('token is not valid');
			}

			var message = {
		    "text": "Thank you for your answer. Have a great weekend!",
			};
			res.json(message);

		} else {
			res.send('Invalid param');
		}

})

router.post('/test-send', function (req, res) {
  url = getUrlForRequest(configResolver.getConfigVariable('TEST_USER'));
  makeHttpsGetRequest(url);
	res.send('"How was your week?" - notifications sent to private channels. Thanks!');
})

router.post('/test-send-many', function (req, res) {
  setCampaign();
  sendToMany();
	res.send('"How was your week?" - notifications sent to private channels. Thanks!');
})

router.post('/test-read', function(req, res) {
  console.log('TEST READ')
  res.send('OK')

  // return firebase.database().ref('/votes').once('value').then(function(snapshot) {
  //   var collections = snapshot.val();
  //   readVotes(collections);
  // }).then(function() {
  //   res.send('All ok');
  // });
})
// </Routers>

// <Functions>
function readVotes(votes) {
  for (var campaign in votes) {
    var dateNow = parseInt(campaign.substring(1, campaign.lenght));
    date = new Date(dateNow);
    var dateOfCampaign = date.toDateString();

    console.log('Campaign date : ' + dateOfCampaign);
    campaignCollection = votes[campaign];
    for (var userId in campaignCollection) {
      console.log(slackUsers[userId] + ' ' + campaignCollection[userId].mood);
    }
  }
}

function getUsersList() {
  slack = new Slack(configResolver.getConfigVariable('API_TOKEN'));
  slack.api(listUsersMethod, {
  }, function(err, response){

    for(var index in response.members) {
      if(!response.members[index].is_bot && !response.members[index].deleted) {
        slackUsers[response.members[index].id] = response.members[index].name;
      }
    }
  })
}

function signInWithEmailPass(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  })
}

function setCampaign() {
  campaignId = 'C' + Date.now();
}

function getUrlForRequest(username) {
  return 'https://slack.com/api/' + postMessageMethod +
    '?token=' + configResolver.getConfigVariable('API_TOKEN') +
    '&username=Mr. Moody' +
    '&as_user=false' +
    '&icon_url=https://s3-us-west-2.amazonaws.com/slack-files2/avatars/2016-11-04/100929399430_30f602e36ebfbc81756b_48.jpg' +
    '&channel=@' + username +
    '&attachments=' + getAttachments();
}

function makeHttpsGetRequest(url) {
  https.get(url, (res) => {
  }).on('error', (e) => {
    console.error('HTTP error:', e);
  });

  return true;
}

function sendToMany() {
  slack = new Slack(configResolver.getConfigVariable('API_TOKEN'));
  slack.api(listUsersMethod, {
  }, function(err, response){

    for(var index in response.members){
      if(!response.members[index].is_bot && !response.members[index].deleted) {
        slackUsername = response.members[index].name;
        var url = getUrlForRequest(slackUsername);
        makeHttpsGetRequest(url);
      }
    }
  });

  return false;
}



app.use('/api', router);
var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('listening on port ' + port)
  console.log('version: ' + version)
  getUsersList()
  signInWithEmailPass(configResolver.getConfigVariable('USER_EMAIL'), configResolver.getConfigVariable('USER_PASS'))
});
