const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    key: {
        type: String,
        require: true,
    },
    user_id: {
        type: String,
        require: true,
    }
})
module.exports = TokenSchema;