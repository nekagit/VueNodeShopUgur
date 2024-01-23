const mongoose = require("mongoose");

const LinkedAccountSchema = new mongoose.Schema({
    provider: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    user_info: {
        type:  Object,
        default: null,
    },
    token: {
        type: Object,
        required: true,
    },
});

module.exports = LinkedAccountSchema;