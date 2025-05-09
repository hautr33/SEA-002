const PlayerModel = require('../models/PlayerModel');

async function findAllPlayers() {
    try {
        const players = await PlayerModel.find({});
        return players;
    } catch (error) {
        throw new Error('Failed to fetch players from DB.');
    }
}
async function findPlayerById(playerId) {
    try {
        const player = await PlayerModel.findOne({ id: playerId });
        if (!player) {
            throw new Error(`Player with ID ${playerId} not found.`);
        }
        return player;
    }
    catch (error) {
        throw new Error(`Failed to fetch player with ID ${playerId}: ${error.message}`);
    }
}

module.exports = {
    findAllPlayers,
    findPlayerById
};