const { playSpecificMatch } = require('../services/mmrService');
const { getHistory } = require('../services/historyService');

function handleMatch(req, res) {
  const { player1Id, player2Id, winnerId } = req.body;
  const result = playSpecificMatch(player1Id, player2Id, winnerId);
  if (!result) return res.status(400).json({ message: 'Trận đấu không hợp lệ.' });

  res.json({ ...result, history: getHistory() });
}

module.exports = { handleMatch };
