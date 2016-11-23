function getAttachments() {
  var resources_attachemnts = require('./resources/attachments.json');
  resources_attachemnts[0].callback_id = campaignId;

  return JSON.stringify(resources_attachemnts);
}
