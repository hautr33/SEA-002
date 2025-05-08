const express = require('express');
const path = require('path');
const app = express();

const matchRoutes = require('./routes/matchRoutes');
const { loadPlayers } = require('./services/playerService');
const { getHistory } = require('./services/historyService');

// ===== Middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== View engine: EJS =====
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// ===== Static assets =====
app.use(express.static(path.join(__dirname, '../public')));

// ===== Route: Trang chủ =====
app.get('/', async (req, res) => {
    const players = await loadPlayers(); // từ mmrService
    res.render('index', { players });
});

// ===== API Routes =====
app.use('/match', matchRoutes);

// ===== API get all players =====
app.get('/players', (req, res) => {
    res.json(loadPlayers());
});

app.get('/history', (req, res) => {
    const history = getHistory();
  
    res.send(`
      <html>
        <head>
          <title>Lịch sử trận đấu</title>
          <style>
            body {
              font-family: monospace;
              background: #f9f9f9;
              padding: 20px;
            }
            pre {
              white-space: pre-wrap;
              background: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 6px rgba(0,0,0,0.1);
            }
          </style>
        </head>
        <body>
          <h2>📜 Lịch sử trận đấu</h2>
          <pre>${JSON.stringify(history, null, 2)}</pre>
        </body>
      </html>
    `);
  });

// ===== Server start =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
