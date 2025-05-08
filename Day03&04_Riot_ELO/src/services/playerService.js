const fs = require('fs/promises');
const path = require('path');
const Player = require('../models/Player');

const filePath = path.join(__dirname, '../models/data/players.json');

async function loadPlayers() {
    const rawData = await fs.readFile(filePath, 'utf-8');
    const json = JSON.parse(rawData);
    return json.map(p => new Player(p.id, p.name, p.mmr, p.lp, p.rank));
}

module.exports = { loadPlayers };
