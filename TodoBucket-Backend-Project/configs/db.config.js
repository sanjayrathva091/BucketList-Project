require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        const conns = await mongoose.connect(MONGO_URI);
        console.log(`Connected to mongoDB successfully!`);
    } catch (error) {
        console.error(`Connection to MongoDB failed! Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;