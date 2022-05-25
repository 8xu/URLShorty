const mongoose = require('mongoose');
const id = require('../utils/id');

const Url = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
        unique: false
    },
    shortUrl: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    }
});

module.exports = mongoose.model('Url', Url);