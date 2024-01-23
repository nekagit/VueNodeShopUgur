const mongoose = require('mongoose');

const BrandMediaDataSchema = new mongoose.Schema({
    brand_id: {
        type: String,
        require: true,
    },
    user_id: {
        type: String,
        require: true,
    },
    downloaded: {
        type: Boolean,
        default: false,
    },
    download_url: {
        type: String,
        required: true,
    },
    download_path: {
        type: String,
        default: "",
    },
})
module.exports = BrandMediaDataSchema;