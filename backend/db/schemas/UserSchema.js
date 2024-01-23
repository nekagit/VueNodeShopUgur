const mongoose = require("mongoose");
const TokenSchema = require('./TokenSchema');
const LinkedAccountSchema = require('./LinkedAccountSchema');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        //trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: {
        type: [TokenSchema],
        default: null,
    },
    linked_accounts: {
        type: [LinkedAccountSchema],
        default: [],
    },
});

module.exports = UserSchema;