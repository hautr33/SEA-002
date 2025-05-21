const { simulateMatches, simulateMatchesWithPlayer } = require('../services/matchServices');

async function simulateRandomMatches(totalMatch) {
  return await simulateMatches(totalMatch);
}

function simulateRandomMatchesWithPlayer(playerId, totalMatch) {
  return simulateMatchesWithPlayer(playerId, totalMatch);
}

module.exports = { simulateRandomMatches, simulateRandomMatchesWithPlayer };
