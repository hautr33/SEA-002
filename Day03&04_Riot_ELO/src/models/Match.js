const History = require('./History');
const PlayerModel = require('./PlayerModel');

class TeamMatch {
    constructor(teamA, teamB, winnerTeam) {
        this.teamA = teamA;
        this.teamB = teamB;
        this.winnerTeam = winnerTeam;
        this.timestamp = new Date().toLocaleString();
    }

    getAverageELO(team) {
        return team.reduce((sum, p) => sum + p.elo , 0) / team.length;
    }

    getKFactor(rank) {
        if (rank <= 2) return 40; 
        if (rank === 3) return 32;
        return 24;
    }

    calculateExpectedScore(avgA, avgB) {
        return 1 / (1 + Math.pow(10, (avgB - avgA) / 400));
    }

    calculateLPChange(player, win) {
        const eloBonus = Math.floor((player.elo - 1500) / 100);

        if (win) {
            return 20 + eloBonus;
        } else {
            return -15 - eloBonus;
        }
    }

    async play() {
        const avgA = this.getAverageELO(this.teamA);
        const avgB = this.getAverageELO(this.teamB);

        const E_A = this.calculateExpectedScore(avgA, avgB);
        const S_A = this.winnerTeam === 'Team A' ? 1 : 0;

        const teamAHistory = await Promise.all(
            this.teamA.map(async player => {
                const lpChange = this.calculateLPChange(player, S_A === 1);
                const before = { elo: player.elo, lp: player.lp, rank: player.rank };

                const eloChange = Math.round(this.getKFactor(player.rank) * (S_A - E_A));

                await player.applyMatchResult(eloChange, lpChange);


                return {
                    id: player.id,
                    name: player.name,
                    beforeELO: before.elo,
                    eloChange: eloChange,
                    afterELO: player.elo,
                    beforeLP: before.lp,
                    lpChange: lpChange,
                    afterLP: player.lp,
                    beforeRank: before.rank,
                    afterRank: player.rank
                };
            }));

        const teamBHistory = await Promise.all(
            this.teamB.map(async player => {
                const lpChange = this.calculateLPChange(player, S_A === 0);
                const before = { elo: player.elo, lp: player.lp, rank: player.rank };

                const eloChange = -Math.round(this.getKFactor(player.rank) * (S_A - E_A));

                await player.applyMatchResult(eloChange, lpChange);

                return {
                    id: player.id,
                    name: player.name,
                    beforeELO: before.elo,
                    eloChange: eloChange,
                    afterELO: player.elo,
                    beforeLP: before.lp,
                    lpChange: lpChange,
                    afterLP: player.lp,
                    beforeRank: before.rank,
                    afterRank: player.rank
                };
            }));
        const history = new History({
            timestamp: this.timestamp,
            winner: this.winnerTeam,
            teamA: teamAHistory,
            teamB: teamBHistory
        });

        await history.saveToDB();

        return history;
    }
}

module.exports = TeamMatch;
