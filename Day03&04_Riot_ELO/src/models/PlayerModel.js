const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    elo: { type: Number, default: 1500 },
    lp: { type: Number, default: 0 },
    rank: { type: Number, default: 1 }
});

const PlayerModel = mongoose.model('Player', playerSchema);

module.exports = PlayerModel;
