const express = require('express')
const router = new express.Router()

const reportsHandler = require('./../modules/reportsHandler')

router.post('/votes', function (req, res) {
    if (req.body.payload) {
        const payload = JSON.parse(req.body.payload)
        const mood = payload.actions[0].value
        const id = payload.user.id
        const campaign = payload.callback_id
        const message = {
            'text': 'Thank you for your answer. Have a great weekend!',
        }
        reportsHandler.writeVoteData(id, mood, campaign)
        res.json(message)
    } else {
        res.send('Invalid param')
    }
})

module.exports = router
