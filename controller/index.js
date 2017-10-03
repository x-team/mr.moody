import express from 'express'
import validationMiddleware from './middleware/validationMiddleware'
import errorMiddleware from './middleware/errorMiddleware'
import commandsController from './commands'
import interactiveMessagesController from './im'

const router = new express.Router()

router.use(validationMiddleware.validateRequest)
router.use(errorMiddleware.errorMiddleware)
router.use(commandsController)
router.use(interactiveMessagesController)

export default router
