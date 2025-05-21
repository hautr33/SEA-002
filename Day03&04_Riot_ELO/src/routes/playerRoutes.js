const express = require('express');
const PlayerModel = require('../models/PlayerModel');
const router = express.Router();
const { prettyPrintJson } = require('pretty-print-json');

// 📚 GET: Lấy tất cả người chơi
router.get('/', async (req, res) => {
    try {
        const players = await PlayerModel.find({});
        const prettyJson = prettyPrintJson.toHtml(players, { indent: 4 });
        res.render('json-view', { prettyJson });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📚 GET: Lấy người chơi theo ID
router.get('/:id', async (req, res) => {
    try {
        const player = await PlayerModel.findOne({ id: req.params.id });
        if (!player) return res.status(404).json({ error: 'Player not found.' });
        res.json(player);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch player.' });
    }
});

module.exports = router;