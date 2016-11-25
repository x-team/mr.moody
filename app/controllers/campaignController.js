const postMessageMethod = 'chat.postMessage'
const listUsersMethod = 'users.list'


// router.post('/test-send', function (req, res) {
//   url = getUrlForRequest(configResolver.getConfigVariable('TEST_USER'));
//   makeHttpsGetRequest(url);
// 	res.send('"How was your week?" - notifications sent to private channels. Thanks!');
// })
//
// router.post('/test-send-many', function (req, res) {
//   setCampaign();
//   sendToMany();
// 	res.send('"How was your week?" - notifications sent to private channels. Thanks!');
// })
//
// function setCampaign() {
//   campaignId = 'C' + Date.now();
// }
//
// function getUrlForRequest(username) {
//   return 'https://slack.com/api/' + postMessageMethod +
//     '?token=' + configResolver.getConfigVariable('API_TOKEN') +
//     '&username=Mr. Moody' +
//     '&as_user=false' +
//     '&icon_url=https://s3-us-west-2.amazonaws.com/slack-files2/avatars/2016-11-04/100929399430_30f602e36ebfbc81756b_48.jpg' +
//     '&channel=@' + username +
//     '&attachments=' + getAttachments();
// }
//
// function makeHttpsGetRequest(url) {
//   https.get(url, (res) => {
//   }).on('error', (e) => {
//     console.error('HTTP error:', e);
//   });
//
//   return true;
// }
//
// function sendToMany() {
//   slack = new Slack(configResolver.getConfigVariable('API_TOKEN'));
//   slack.api(listUsersMethod, {
//   }, function(err, response){
//
//     for(var index in response.members){
//       if(!response.members[index].is_bot && !response.members[index].deleted) {
//         slackUsername = response.members[index].name;
//         var url = getUrlForRequest(slackUsername);
//         makeHttpsGetRequest(url);
//       }
//     }
//   });
//
//   return false;
// }
