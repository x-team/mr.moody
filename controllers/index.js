const express = require('express')
const router = new express.Router()

const validationMiddleware = require('./middleware/validationMiddleware')
const errorMiddleware = require('./middleware/errorMiddleware')
const commandsController = require('./commandsController')
const interactiveMessagesController = require('./interactiveMessagesController')

router.use(validationMiddleware.validateRequest)
router.use(errorMiddleware.errorMiddleware)
router.use(commandsController)
router.use(interactiveMessagesController)

module.exports = router
