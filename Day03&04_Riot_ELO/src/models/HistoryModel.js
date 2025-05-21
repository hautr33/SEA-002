const mongoose = require('mongoose');

const playerHistorySchema = new mongoose.Schema({
    id: Number,
    name: String,
    beforeELO: Number,
    eloChange: Number,
    afterELO: Number,
    beforeLP: Number,
    lpChange: Number,
    afterLP: Number,
    beforeRank: Number,
    afterRank: Number
});

const historySchema = new mongoose.Schema({
    timestamp: String,
    winner: String,
    teamA: [playerHistorySchema],
    teamB: [playerHistorySchema]
});

const HistoryModel = mongoose.model('History', historySchema);

module.exports = HistoryModel;
