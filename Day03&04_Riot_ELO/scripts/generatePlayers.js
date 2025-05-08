const fs = require('fs');
const path = require('path');

const players = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Player${i + 1}`,
  mmr: 1400 + Math.floor(Math.random() * 201), // random từ 1400–1600
  lp: Math.floor(Math.random() * 101),         // 0–100 LP
  rank: 1 + Math.floor(Math.random() * 5)      // Rank 1–5
}));

const filePath = path.join(__dirname, '../src/models/data/players.json');

fs.mkdirSync(path.dirname(filePath), { recursive: true });
fs.writeFileSync(filePath, JSON.stringify(players, null, 2));

console.log(`✅ Đã tạo 100 người chơi tại ${filePath}`);
