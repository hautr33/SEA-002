const mongoose = require('mongoose');
const PlayerModel = require('../src/models/PlayerModel');
const HistoryModel = require('../src/models/HistoryModel');

const MONGO_URI = 'mongodb+srv://hautt33:ECdpk3no1nR2U3Tn@sea-002.q0vnuic.mongodb.net/riot_elo';

function calculateRankFromELO(elo) {
    if (elo < 800) return 1;           // Bronze 🧱
    if (elo < 1000) return 2;           // Silver 🛡
    if (elo < 1200) return 3;           // Gold ⚔️
    if (elo < 1400) return 4;          // Platinum 🏆
    if (elo < 1600) return 5;          // Diamond 👑
    if (elo < 1800) return 6;          // Master 🐉
    return 7;                          // Grandmaster/Challenger 🌟
}

async function generateAndUploadPlayers() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true,
        });
        console.log('Connected to MongoDB');

        await PlayerModel.deleteMany({});
        await HistoryModel.deleteMany({});
        console.log('Existing player data cleared.');

        const players = Array.from({ length: 100 }, (_, i) => {
            const elo = 400 + Math.floor(Math.random() * 1001); 
            return {
                id: i + 1,
                name: `Player ${i + 1}`,
                elo,
                lp: Math.floor(Math.random() * 101),    
                rank: calculateRankFromELO(elo)
            };
        });

        await PlayerModel.insertMany(players);
        console.log('Successfully generated and uploaded 100 players to MongoDB.');
    } catch (error) {
        console.error('Error generating players:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
}

generateAndUploadPlayers();
