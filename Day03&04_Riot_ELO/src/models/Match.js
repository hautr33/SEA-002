class Match {
    constructor(playerA, playerB, winnerId, kFactor = 32) {
        this.playerA = playerA;
        this.playerB = playerB;
        this.k = kFactor;
        this.winnerId = winnerId;
    }

    calculateExpectedScore(rA, rB) {
        return 1 / (1 + Math.pow(10, (rB - rA) / 400));
    }

    calculateLPChange(player, win) {
        const base = 20;
        const bonus = Math.floor((player.mmr - 1500) / 100);
        return win ? base + bonus : -15 - bonus;
    }

    play() {
        const E_A = this.calculateExpectedScore(this.playerA.mmr, this.playerB.mmr);
        const E_B = 1 - E_A;

        const S_A = this.winnerId === this.playerA.id ? 1 : 0;
        const S_B = 1 - S_A;

        const deltaA = Math.round(this.k * (S_A - E_A));
        const deltaB = Math.round(this.k * (S_B - E_B));

        const lpA = this.calculateLPChange(this.playerA, S_A === 1);
        const lpB = this.calculateLPChange(this.playerB, S_B === 1);

        this.playerA.applyMatchResult(deltaA, lpA);
        this.playerB.applyMatchResult(deltaB, lpB);

        return {
            playerA: { id: this.playerA.id, mmr: this.playerA.mmr, lp: this.playerA.lp, rank: this.playerA.rank },
            playerB: { id: this.playerB.id, mmr: this.playerB.mmr, lp: this.playerB.lp, rank: this.playerB.rank }
        };
    }
}

module.exports = Match;  