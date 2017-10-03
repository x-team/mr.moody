import express from 'express'
import reportsHandler from './../handler/reports'

const router = new express.Router()

router.post('/votes', function (req, res) {
	if (req.body.payload) {
		payload = JSON.parse(req.body.payload)
		mood = payload.actions[0].value
		id = payload.user.id
		campaign = payload.callback_id
		reportsHandler.writeVoteData(id, mood, campaign)
		message = {
			"text": "Thank you for your answer. Have a great weekend!",
		};
		res.json(message);

	} else {
		res.send('Invalid param');
	}
})

export default router
