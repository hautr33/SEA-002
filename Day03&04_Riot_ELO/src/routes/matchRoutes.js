const express = require('express');
const router = express.Router();
const { handleMatch } = require('../controllers/matchController');

const { getAllPlayers } = require('../services/mmrService');

router.post('/', handleMatch);

router.get('/players', (req, res) => {
    res.json(getAllPlayers());
});

module.exports = router;
