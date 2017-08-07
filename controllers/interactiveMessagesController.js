const express = require('express')
const router = new express.Router()

const reportsHandler = require('./../modules/reportsHandler')

router.post('/votes', function (req, res) {
	if (req.body.payload) {
		payload = JSON.parse(req.body.payload)
		mood = payload.actions[0].value
		id = payload.user.id
		campaign = payload.callback_id
		reportsHandler.writeVoteData(id, mood, campaign)
		message = {
			"text": "Thank you for your answer. Have a great next week!",
		};
		res.json(message);

	} else {
		res.send('Invalid param');
	}
})

module.exports = router
