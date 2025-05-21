import db from '../config/database'
import Enums from "../utils/enum";
import { CountRecordsOnInit } from '../utils/decorator';

type StatusType = `${Enums.TaskStatus}`
type PriorityType = `${Enums.TaskPriority}`

interface StoryFilter {
    id?: string;
    name?: string;
    status?: StatusType;
    tag?: string;
    priority?: PriorityType;
    ownerId?: string;
    sprintId?: string;
}

interface StoryUpdateData {
    name?: string;
    status?: StatusType;
    tag?: string;
    priority?: PriorityType;
    ownerId?: string;
    sprintId?: string;
}

@CountRecordsOnInit('story')
class Story {
    private id: string;
    private name: string;
    private status: StatusType;
    private tag: string;
    private priority: PriorityType;
    private ownerId: string;
    private sprintId: string;
    private static counter: number;

    constructor(name: string, status: StatusType, tag: string, priority: PriorityType, ownerId: string, sprintId: string) {
        this.id = `story-${Story.counter++}`
        this.name = name;
        this.status = status;
        this.tag = tag;
        this.priority = priority;
        this.ownerId = ownerId;
        this.sprintId = sprintId;
    }

    getId() {
        return this.id;
    }
    
    static generateData() {
        const result = db.prepare('SELECT 1 FROM story LIMIT 1').get();
        const priorities: Enums.TaskPriority[] = Object.values(Enums.TaskPriority);
        const statuses: Enums.TaskStatus[] = Object.values(Enums.TaskStatus);
        if (!result) {
            for (let i = 1; i <= 5; i++) {
                const name = `Story ${i}`;
                const status = statuses[Math.floor(Math.random() * 3)];
                const tag = `tag-${Math.ceil(Math.random() * 3)}`;
                const priority = priorities[Math.floor(Math.random() * 3)]
                const ownerId = `user-${Math.ceil(Math.random() * 5)}`;
                const sprintId = `sprint-${Math.ceil(Math.random() * 2)}`;

                const story = new Story(name, status, tag, priority, ownerId, sprintId);
                story.save();
            }
        }
    }

    save() {
        const stmt = db.prepare(`
            INSERT OR REPLACE INTO story 
            (id, name, status, tag, priority, ownerId, sprintId) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        stmt.run(
            this.id, this.name, this.status, this.tag,
            this.priority, this.ownerId, this.sprintId
        );
    }

    static find(filter?: StoryFilter): Story[] {
        let sql = 'SELECT * FROM story';
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
        return stmt.all(...params) as Story[];
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

        const sql = `UPDATE story SET ${fields.join(', ')} WHERE id = ?`;
        const stmt = db.prepare(sql);
        const result = stmt.run(...params);

        return result.changes > 0;
    }

    static delete(id: string): boolean {
        const stmt = db.prepare('DELETE FROM story WHERE id = ?');
        const result = stmt.run(id);

        return result.changes > 0;
    }
}

export default Story