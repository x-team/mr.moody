const validationMiddleware = require('./middleware/validationMiddleware')
const errorMiddleware = require('./middleware/errorMiddleware')
const reportsController = require('./reportsController')

module.exports = (router) => {
  router.use(validationMiddleware.validateRequest)
  router.use(errorMiddleware.errorMiddleware)

  router.post('/slack-command', function (req, res) {
    action = req.body.text
    switch (action) {
      case "campaign:start":
        console.log('starting campaign ...')
        res.send('Starting campaign')
        break;
      case "campaign:list":
        console.log('showing campaign list ...')
        reportsController.generateReport(req, res);
        break;
      default:
        res.send('You have to pick action')
    }
  })
}
