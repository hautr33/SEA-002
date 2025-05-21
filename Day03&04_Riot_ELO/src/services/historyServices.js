const HistoryModel = require('../models/HistoryModel');

async function findHistoriesByPlayer(playerId) {
    try {
        const histories = await HistoryModel.find({
            $or: [
                { 'teamA.id': playerId },
                { 'teamB.id': playerId }
            ]
        });

        if (histories.length === 0) {
            return `No history found for playerId: ${playerId}`;
        }

        return histories;
    } catch (error) {
        console.error('Error finding histories:', error);
        return `Error: ${error.message}`;
    }
}

module.exports = {
    findHistoriesByPlayer
};
