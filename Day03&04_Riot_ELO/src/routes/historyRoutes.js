const express = require('express');
const router = express.Router();
const { prettyPrintJson } = require('pretty-print-json');

const HistoryModel = require('../models/HistoryModel');
const PlayerModel = require('../models/PlayerModel');
const { findHistoriesByPlayer } = require('../services/historyServices');

// router.get('/', async (req, res) => {
//     try {
//         const histories = await HistoryModel.find({}).sort({ timestamp: -1 });
//         const prettyJson = prettyPrintJson.toHtml(histories, { indent: 4 });
//         res.render('json-view', { prettyJson });
//         // res.json(histories);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch histories.' });
//     }
// });
router.get('/', async (req, res) => {
    const players = await PlayerModel.find({});
    const selectedPlayerId = req.query.playerId || 1;

    let selectedPlayer = null;
    let histories = [];
    if (selectedPlayerId) {
        selectedPlayer = players.find(player => player.id === parseInt(selectedPlayerId));
        histories = await HistoryModel.find({
            $or: [
                { 'teamA.id': parseInt(selectedPlayerId) },
                { 'teamB.id': parseInt(selectedPlayerId) }
            ]
        }).sort({ timestamp: -1 });
    }

    res.render('history', { 
        players, 
        selectedPlayer, 
        histories 
    });
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const histories = await findHistoriesByPlayer(id);
        if (typeof histories === 'string') {
            return res.status(404).json({ error: histories });
        }
        const prettyJson = prettyPrintJson.toHtml(histories, { indent: 4 });
        res.render('json-view', { prettyJson });
        // res.json(histories);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;