const mongoose = require('mongoose');
const logger = require('../utils/logger');
require('dotenv').config();

const connectDB = async () => {
    try {
        const database = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.event(`MongoDB connected: ${database.connection.host}.`)
    } catch (error) {
        logger.error(`MongoDB connection error: ${error}`);
    }
};

module.exports = connectDB;