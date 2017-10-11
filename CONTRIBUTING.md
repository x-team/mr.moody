<h1 align="center">:heart: THANK YOU :heart:</h1>
<p align="center"> We greatly appreciate your contributions!<br> Thanks for even consider doing some good in here. </p>

## How do I contribute ?
* there is a list of issues in [Issues](https://github.com/jacekelgda/mr.moody/issues) section. You can start in there be resolving some of them.
* if you want to propose a new feature you came up with for Mr. Moody, please create new issue with label `idea`
* we welcome all improvements to documentation: README.md and this file

## GIT workflow

* please fork this repository
* create a feature branch for issue you will be fixing
* use smart commits to reference issue you will be fixing
* if you finish your fix for issue create a PR from your forks feature branch to this repository `master` branch

When PR is created there will be a CI check running all requirements for the project, such as `linter` and `tests`.

If your PR fails the build, make sure you fix it and update.

## Setup

If you would like to setup Mr. Moody project locally, there are a few steps to do so.

### Firebase

Create firebase project

* use *"Add firebase to your web app"* and copy all configuration details
* create `.env` from `.env.TEMPLATE` and fill in firebase config data
* go to authentication and enable `anonymous` sign in method
* setup your security rules under `database > rules`

### Slack

Create development Slack application
*Note: You need to be a team admin to install vacation bot*

* go to api.slack.com and create new application
* your application needs to have those scopes in `OAuth & Permissions`:

| Scopes |
| --- |
| bot |
| commands |

* and your redirect url defined: http://yourdomain.com/api/auth (or https) Note: this url for testing can be your localhost as well.
* your app needs to have bot user created
* your app needs to have `interactive messages` endpoint configured: https://yourdomain.com/api/im ( I recommend heroku.com ) Note: this url needs to publicly accessible https endpoint.
* your can now copy all slack configuration data from your slack app settings page:

| Basic information | OAuth & Permissions |
| --- | --- |
| slack_app_client_id=xxx | slack_api_token=xxx |
| slack_app_client_secret=xxx | slack_bot_token=xxx |

![Oauth & Permissions](https://user-images.githubusercontent.com/1003372/31438240-f9a8f228-ae87-11e7-954e-370809a73f14.png)

![Basic information](https://user-images.githubusercontent.com/1003372/31438359-2ab5f0c8-ae88-11e7-956a-eb7f77761bc2.png)

![Scopes](https://user-images.githubusercontent.com/1003372/31438394-4669bdcc-ae88-11e7-93b1-7ba0f22e82d6.png)

## Heroku

I do recommend using Heroku for local and server side development. It is very easy to deploy and setup on both environments and it's free. It provides https endpoints by default as well.

Install heroku CLI on your local machine to use `heroku local` functionalities.

Some of the functionalities of the application ***you will be able*** to test without deploying to public server, like:

* bot websockets RTM connection, slack web API connection, hosting add to slack button and others

You will ***not be able to host public endpoints*** which are needed for two actions:

* authorizing application for installing to slack team
* interactive messages request handling

For those I recommend deploying to ***Heroku*** but you can also use other services and tunneling for local environment, such as ***localtunnel*** or ***ngrok*** ( connection quality will depend on your internet).
