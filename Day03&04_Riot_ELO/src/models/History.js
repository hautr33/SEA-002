const HistoryModel = require('./HistoryModel');

class History {
  constructor({ timestamp, winner, teamA, teamB }) {
    this.timestamp = timestamp;
    this.winner = winner;
    this.teamA = teamA;
    this.teamB = teamB;
  }

  toJSON() {
    return JSON.stringify({
      timestamp: this.timestamp,
      winner: this.winner,
      teamA: this.teamA,
      teamB: this.teamB
    }, null, 2);
  }

  async saveToDB() {
    try {
      const result = await HistoryModel.create({
        timestamp: this.timestamp,
        winner: this.winner,
        teamA: this.teamA,
        teamB: this.teamB
      });
      console.log(`History saved to MongoDB with _id: ${result._id}`);
    } catch (error) {
      console.error('Error saving history to DB:', error);
    }
  }
}

module.exports = History;
