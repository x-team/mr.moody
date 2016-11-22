var Slack = require('slack-node');
var config = require('config');

slack = new Slack(config.get('api.oauth.api_token'));
slack.api('oauth.access', {
  client_id: config.get('api.oauth.client_id'),
  client_secret: config.get('api.oauth.client_secret'),
  code: config.get('api.oauth.code')
}, function(err, response){
  console.log(response);
});
