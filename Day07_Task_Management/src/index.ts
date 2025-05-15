import Sprint from './models/sprint'
import Story from './models/story'
import Task from './models/task'

import express, { json, urlencoded } from 'express';
import path from 'path';
import homeRouter from './routes/home';
import taskRouter from './routes/task';

const app = express();
const PORT = 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));

async function startServer() {
    Task.generateData()
    Story.generateData()
    Sprint.generateData()

    // Routes
    app.use('/', homeRouter);
    app.use('/tasks', taskRouter);

    // app.get('/', async (req, res) => {
    //     const players = await findAllPlayers()
    //     const message = req.query.message || null;
    //     res.render('index', { players, message });
    // });

    // app.post('/', async (req, res) => {
    //     const { playerId, matchCount } = req.query;
    //     await simulateRandomMatchesWithPlayer(playerId, matchCount);
    //     res.render('index', { players });
    // });

    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });

}

startServer().catch(err => {
    console.error('Failed to start server:', err);
});
