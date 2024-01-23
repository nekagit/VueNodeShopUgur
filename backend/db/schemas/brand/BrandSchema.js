const mongoose = require("mongoose");

const MediaSchema = require('./BrandMediaSchema');
const LinkedAccountSchema = require('./BrandLinkedAccountSchema');


const BrandSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    media: {
        type: MediaSchema,
        required: true,
    },
    linked_accounts: {
        type: [ LinkedAccountSchema ],
        default: [],
    },
});

module.exports = BrandSchema;
