const express = require('express');
const router = express.Router();
const { simulateRandomMatches, simulateRandomMatchesWithPlayer } = require('../controllers/matchController');

router.post('/random', async (req, res) => {
    const { matchCount } = req.body;
    const message = await simulateRandomMatches(matchCount);
    res.redirect('/?message=' + encodeURIComponent(message));

    // const message = await simulateRandomMatches(matchCount);
    // res.setHeader('Content-Type', 'application/json');
    // res.json({
    //     message: message
    // });
}
);

router.post('/player', async (req, res) => {
    const { playerId, matchCount } = req.body;
    const message = await simulateRandomMatchesWithPlayer(playerId, matchCount);
    res.redirect('/?message=' + encodeURIComponent(message));

    // const message = await simulateRandomMatchesWithPlayer(playerId, matchCount);
    // res.setHeader('Content-Type', 'application/json');
    // res.json({
    //     message: message
    // });
});

module.exports = router;
