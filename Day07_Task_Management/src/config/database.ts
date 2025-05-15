import DatabaseConstructor, { Database as BetterSqliteDatabase, Statement } from 'better-sqlite3';

const db: BetterSqliteDatabase = new DatabaseConstructor('database.db', { verbose: console.log, });
db.exec(`
    CREATE TABLE IF NOT EXISTS task (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        status TEXT,
        tag TEXT,
        priority TEXT,
        estimateTime TEXT,
        dueDate TEXT,
        ownerId TEXT,
        storyId TEXT
    );

    CREATE TABLE IF NOT EXISTS story (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        status TEXT,
        tag TEXT,
        priority TEXT,
        ownerId TEXT,
        sprintId TEXT
    );

    CREATE TABLE IF NOT EXISTS sprint (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        startDate TEXT,
        endDate TEXT
    );
`);

export default db;

