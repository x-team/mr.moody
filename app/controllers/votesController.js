router.post('/notify', function (req, res) {
		if (req.body.payload) {
			var payload = JSON.parse(req.body.payload);

			if (payload.token == configResolver.getConfigVariable('VERIFICATION_TOKEN')) {
				var mood = payload.actions[0].value;
				var id = payload.user.id;
        var campaign = payload.callback_id;
        writeVoteData(id, mood, campaign);
			} else {
				console.log('token is not valid');
			}

			var message = {
		    "text": "Thank you for your answer. Have a great weekend!",
			};
			res.json(message);

		} else {
			res.send('Invalid param');
		}

})
