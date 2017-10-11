const { getAttachments } = require('./../attachmentsResolver')

test('it should provide attachments', () => {
  const message =  "[{\"fallback\":\"How was your week ?\",\"pretext\":\"How was your week ?\",\"callback_id\":\"C123456\",\"attachment_type\":\"default\",\"color\":\"good\",\"actions\":[{\"name\":\"smile\",\"text\":\":smile:\",\"type\":\"button\",\"value\":\"smile\"},{\"name\":\"neutral_face\",\"text\":\":neutral_face:\",\"type\":\"button\",\"value\":\"neutral_face\"},{\"name\":\"disappointed\",\"text\":\":disappointed:\",\"type\":\"button\",\"value\":\"disappointed\"}]}]"
  expect(getAttachments('C123456')).toEqual(message)
})
