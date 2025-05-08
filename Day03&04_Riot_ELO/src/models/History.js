class History {
    constructor({ winnerId, playerA, playerB, mmrChangeA, mmrChangeB, lpChangeA, lpChangeB }) {
      this.timestamp = new Date().toLocaleString();
      this.playerA = playerA.name;
      this.playerB = playerB.name;
      this.winner = winnerId === playerA.id ? playerA.name : playerB.name;
  
      this.mmrChangeA = mmrChangeA;
      this.mmrChangeB = mmrChangeB;
      this.lpChangeA = lpChangeA;
      this.lpChangeB = lpChangeB;
  
      this.mmrA = playerA.mmr;
      this.mmrB = playerB.mmr;
      this.lpA = playerA.lp;
      this.lpB = playerB.lp;
    }
  }
  
  module.exports = History;
  