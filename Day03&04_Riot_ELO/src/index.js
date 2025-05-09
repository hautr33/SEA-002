const express = require('express');
const { join } = require('path');
const { json, urlencoded, static: staticFiles } = require('express');

const connectDB = require('./config/db');

const playerRoutes = require('./routes/playerRoutes');
const matchRoutes = require('./routes/matchRoutes');
const historyRoutes = require('./routes/historyRoutes');

const { findAllPlayers } = require('./services/playerServices');
const { simulateRandomMatchesWithPlayer } = require('./controllers/matchController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.set('views', join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(staticFiles(join(__dirname, '../public')));

async function startServer() {
  await connectDB();

  app.use('/api/players', playerRoutes);
  app.use('/api/matches', matchRoutes);
  app.use('/api/histories', historyRoutes);

  app.get('/', async (req, res) => {
    const players = await findAllPlayers()
    const message = req.query.message || null;
    res.render('index', { players, message });
  });

  app.post('/', async (req, res) => {
    const { playerId, matchCount } = req.query;
    await simulateRandomMatchesWithPlayer(playerId, matchCount);
    res.render('index', { players });
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});

