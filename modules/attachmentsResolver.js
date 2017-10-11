const getAttachments = (campaignId) => {
    let resources_attachemnts = require('./../resources/attachments.json')
    resources_attachemnts[0].callback_id = campaignId

    return JSON.stringify(resources_attachemnts)
}

module.exports = {
    getAttachments
}
