const mongoose = require('mongoose');
const BrandMediaDataSchema = require('./BrandMediaDataSchema')

const BrandMediaSchema = new mongoose.Schema({
    list: {
        type: [BrandMediaDataSchema],
        default: [],
    },
    download: {
        type: Object,
        default: {
            byProfileUrls: false,
            profile_urls: []
        },
    },
    edit: {
        type: Object,
        default: null
    },
    upload: {
        type: Object,
        default: {
            time: ""
        }
    }

})
module.exports = BrandMediaSchema;