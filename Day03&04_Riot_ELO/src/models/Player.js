class Player {
    constructor(id, name, mmr = 1500, lp = 0, rank = 1) {
        this.id = id;
        this.name = name;
        this.mmr = mmr;
        this.lp = lp;
        this.rank = rank;
    }

    applyMatchResult(deltaMMR, deltaLP) {
        console.log(`Player ${this.name} (${this.id}) - MMR: ${this.mmr}, LP: ${this.lp}, Rank: ${this.rank}`);
        console.log(`Applying match result: MMR Change: ${deltaMMR}, LP Change: ${deltaLP}`);
        this.mmr += deltaMMR;
        this.lp += deltaLP;

        if (this.lp >= 100) {
            this.rank++;
            this.lp = 0;
        } else if (this.lp < 0) {
            if (this.rank > 1) {
                this.rank--;
                this.lp = 75;
            } else {
                this.lp = 0;
            }
        }
    }
}

module.exports = Player;  