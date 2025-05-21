import db from '../config/database'
import { CountRecordsOnInit } from "../utils/decorator";

interface StoryFilter {
    id?: string;
    name?: string;
    startDate?: string;
    endDate?: string;
}

interface StoryUpdateData {
    name?: string;
    tag?: string;
    startDate?: string;
    endDatesprintId?: string;
}

@CountRecordsOnInit('sprint')
class Sprint {
    private id: string;
    private name: string;
    private startDate: string;
    private endDate: string;
    private static counter: number;

    constructor(name: string, startDate: string, endDate: string) {
        this.id = `sprint-${Sprint.counter++}`;
        this.name = name;
        this.startDate = startDate
        this.endDate = endDate
    }

    getId() {
        return this.id;
    }

    static generateData() {
        const result = db.prepare('SELECT 1 FROM sprint LIMIT 1').get();
        if (!result) {
            for (let i = 1; i <= 2; i++) {
                const name = `Sprint ${i}`;
                const startDate = new Date(Date.now() + (i - 1) * 14 * 86400000).toISOString().split('T')[0];
                const endDate = new Date(Date.now() + i * 14 * 86400000).toISOString().split('T')[0];
                const sprint = new Sprint(name, startDate, endDate)
                sprint.save();
            }
        }
    }

    save() {
        const stmt = db.prepare(`
            INSERT OR REPLACE INTO sprint 
            (id, name, startDate, endDate) 
            VALUES (?, ?, ?, ?)
        `);
        stmt.run(this.id, this.name, this.startDate, this.endDate);
    }

    static find(filter?: StoryFilter): Sprint[] {
        let sql = 'SELECT * FROM sprint';
        const conditions: string[] = [];
        const params: any[] = [];
        if (filter) {

            for (const [key, value] of Object.entries(filter)) {
                if (key === 'name') {
                    conditions.push(`${key} LIKE ?`);
                    params.push(`%${value}%`);
                }
                else {
                    conditions.push(`${key} = ?`);
                    params.push(value);

                }
            }

            if (conditions.length > 0) {
                sql += ' WHERE ' + conditions.join(' AND ');
            }
        }
        const stmt = db.prepare(sql);
        return stmt.all(...params) as Sprint[];
    }

    static update(id: string, updates: StoryUpdateData): boolean {
        if (!updates || Object.keys(updates).length === 0) {
            console.log('Dont have field to update.');
            return false;
        }

        const fields: string[] = [];
        const params: any[] = [];

        for (const [key, value] of Object.entries(updates)) {
            fields.push(`${key} = ?`);
            params.push(value);
        }

        params.push(id);

        const sql = `UPDATE sprint SET ${fields.join(', ')} WHERE id = ?`;
        const stmt = db.prepare(sql);
        const result = stmt.run(...params);

        return result.changes > 0;
    }

    static delete(id: string): boolean {
        const stmt = db.prepare('DELETE FROM sprint WHERE id = ?');
        const result = stmt.run(id);

        return result.changes > 0;
    }
}

export default Sprint