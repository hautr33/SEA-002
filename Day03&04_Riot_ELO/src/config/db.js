const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://hautt33:ECdpk3no1nR2U3Tn@sea-002.q0vnuic.mongodb.net/riot_elo', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB via Mongoose!');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
    }
}

module.exports = connectDB;
