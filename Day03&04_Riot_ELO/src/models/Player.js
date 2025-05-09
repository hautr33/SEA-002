const PlayerModel = require('./PlayerModel');

class Player {
    constructor(id, name, elo = 1500, lp = 0, rank = 1) {
        this.id = id;
        this.name = name;
        this.elo = elo;
        this.lp = lp;
        this.rank = rank;
    }

    async applyMatchResult(deltaELO, deltaLP) {
        this.elo += deltaELO;
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

        await PlayerModel.findOneAndUpdate(
            { id: this.id },
            { 
                elo: this.elo, 
                lp: this.lp, 
                rank: this.rank 
            },
            { new: true }
        );
    }

    async saveToDB() {
        try {
            await PlayerModel.findOneAndUpdate(
                { id: this.id },
                {
                    elo: this.elo,
                    lp: this.lp,
                    rank: this.rank
                },
                { upsert: true, new: true }
            );
        } catch (error) {
            console.error(`Failed to update Player [${this.name}] to DB:`, error);
        }
    }

    static async loadFromDB(id) {
        try {
            const playerData = await PlayerModel.findOne({ id });
            if (!playerData) return null;

            return new Player(
                playerData.id,
                playerData.name,
                playerData.elo,
                playerData.lp,
                playerData.rank
            );
        } catch (error) {
            console.error(`Failed to load Player [${id}] from DB:`, error);
            return null;
        }
    }
}

module.exports = Player;
