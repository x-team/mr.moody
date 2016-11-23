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
