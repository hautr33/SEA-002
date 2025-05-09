const PlayerModel = require('../models/PlayerModel');
const Player = require('../models/Player');
const TeamMatch = require('../models/Match');

async function simulateMatches(matchCount = 100, teamSize = 5) {
    try {
        for (let i = 0; i < matchCount; i++) {
            const players = await PlayerModel.find({});
            if (players.length < teamSize * 2) {
                return 'Not enough players to simulate matches.';
            }
            const shuffled = players.sort(() => 0.5 - Math.random());
            const teamAData = shuffled.slice(0, teamSize);
            const teamBData = shuffled.slice(teamSize, teamSize * 2);

            const teamA = teamAData.map(p => new Player(p.id, p.name, p.elo, p.lp, p.rank));
            const teamB = teamBData.map(p => new Player(p.id, p.name, p.elo, p.lp, p.rank));

            const winningTeam = Math.random() < 0.5 ? 'Team A' : 'Team B';

            const match = new TeamMatch(teamA, teamB, winningTeam);
            const history = await match.play();

            console.log(`🏆 Match ${i + 1} complete. Winner: ${history.winner}`)
        }

        return 'Simulation completed.'
    } catch (error) {
        return ` Simulation error: ${error.message}`;
    }
}

async function simulateMatchesWithPlayer(playerId, matchCount = 100, teamSize = 5) {
    try {
        console.log(`Simulating matches for player ID: ${playerId}`);
        const targetPlayerData = await PlayerModel.findOne({ id: playerId });

        if (!targetPlayerData) {
            return `Player with ID ${playerId} not found.`;
        }
        
        for (let i = 0; i < matchCount; i++) {
            const players = await PlayerModel.find({});

            if (players.length < teamSize * 2) {
                return 'Not enough players to simulate matches.';
            }
            const availablePlayers = players.filter(p => p.id !== playerId);
            const shuffled = availablePlayers.sort(() => 0.5 - Math.random());

            const teamAData = [targetPlayerData, ...shuffled.slice(0, teamSize - 1)];
            const teamBData = shuffled.slice(teamSize - 1, teamSize * 2 - 1);

            const teamA = teamAData.map(p => new Player(p.id, p.name, p.elo, p.lp, p.rank));
            const teamB = teamBData.map(p => new Player(p.id, p.name, p.elo, p.lp, p.rank));

            const winningTeam = Math.random() < 0.75 ? 'Team A' : 'Team B';

            const match = new TeamMatch(teamA, teamB, winningTeam);
            const history = match.play();

            console.log(`🏆 Match ${i + 1} complete. Winner: ${history.winner}`);
        }

        return 'Simulation completed.';
    } catch (error) {
        return `Simulation error: ${error.message}`;
    }
}

module.exports = {
    simulateMatches,
    simulateMatchesWithPlayer
};
