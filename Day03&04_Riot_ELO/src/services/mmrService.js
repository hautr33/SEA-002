const { loadPlayers } = require('./playerService');
const { logMatch } = require('./historyService');
const Match = require('../models/Match');

function getAllPlayers() {
    return players;
}

async function playSpecificMatch(player1Id, player2Id, winnerId) {
    const players = await loadPlayers();
    const a = players.find(p => p.id === player1Id);
    const b = players.find(p => p.id === player2Id);
    if (!a || !b) return null;

    const match = new Match(a, b, winnerId);
    const result = match.play();
    console.log('Match result:', result);
    logMatch({
        winnerId,
        playerA: a,
        playerB: b,
        mmrChangeA: result.mmrChangeA,
        mmrChangeB: result.mmrChangeB,
        lpChangeA: result.lpChangeA,
        lpChangeB: result.lpChangeB
    });

    return { result, players: [a, b] };
}

module.exports = {
    getAllPlayers,
    playSpecificMatch
};