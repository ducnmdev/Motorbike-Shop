require('dotenv').config();
const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connect DB successfully!')
    } catch (error) {
        console.log('Connect DB failure!')
    }
};

module.exports = connectDatabase;
