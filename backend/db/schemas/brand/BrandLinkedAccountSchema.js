const mongoose = require('mongoose');

const BrandLinkedAccountSchema = new mongoose.Schema({
    brand_id: {
        type: String,
        require: true,
    },
    user_id: {
        type: String,
        require: true,
    },
    linked_account_id: {
        type: String,
        require: true,
    },

    provider: {
        type: String,
        required: true,
    },

    upload_times: {
        type: [String],
        default: [],
    },

})
module.exports = BrandLinkedAccountSchema;