import db from '../config/database'
import Enums from '../utils/enum';

type StatusType = `${Enums.TaskStatus}`
type PriorityType = `${Enums.TaskPriority}`

interface TaskFilter {
    id?: string;
    name?: string;
    status?: StatusType;
    tag?: string;
    priority?: PriorityType;
    assigneeId?: string;
    storyId?: string;
}

interface TaskUpdateData {
    name?: string;
    status?: StatusType;
    tag?: string;
    priority?: PriorityType;
    estimateTime?: string;
    dueDate?: string;
    assigneeId?: string;
    storyId?: string;
}

export class Task {
    private id: string;
    private name: string;
    private status: StatusType;
    private tag: string;
    private priority: PriorityType;
    private estimateTime: string;
    private dueDate: string;
    private assigneeId: string;
    private storyId: string;
    private counter: number = 1;

    constructor(name: string, tag: string, priority: PriorityType, estimateTime: string, dueDate: string, assigneeId: string, storyId: string) {
        this.id = `task-${this.counter++}`;
        this.name = name;
        this.status = Enums.TaskStatus.ToDo;
        this.tag = tag;
        this.priority = priority;
        this.estimateTime = estimateTime;
        this.dueDate = dueDate;
        this.assigneeId = assigneeId;
        this.storyId = storyId;
    }

    getId() {
        return this.id;
    }

    static generateTask() {
        const result = db.prepare('SELECT 1 FROM task LIMIT 1').get();
        const priorities: Enums.TaskPriority[] = Object.values(Enums.TaskPriority);
        const statuses: Enums.TaskStatus[] = Object.values(Enums.TaskStatus);
        if (!result) {
            for (let i = 1; i <= 20; i++) {
                const name = `Task ${i}`;
                const tag = i % 2 === 0 ? 'backend' : 'frontend';
                const priority = priorities[Math.floor(Math.random() * 3)]
                const estimateTime = `${Math.ceil(Math.random() * 8)}h`;
                const dueDate = new Date(Date.now() + i * 86400000).toISOString().split('T')[0]; // Today + i day
                const assigneeId = `user-${Math.ceil(Math.random() * 5)}`;
                const storyId = `story-${Math.ceil(Math.random() * 3)}`;

                const task = new Task(name, tag, priority, estimateTime, dueDate, assigneeId, storyId);
                task.status = statuses[Math.floor(Math.random() * 3)]
                task.save()
            }
        }
    }

    save() {
        const stmt = db.prepare(`
            INSERT OR REPLACE INTO task 
            (id, name, status, tag, priority, estimateTime, dueDate, assigneeId, storyId) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        stmt.run(
            this.id, this.name, this.status, this.tag,
            this.priority, this.estimateTime, this.dueDate, this.assigneeId, this.storyId
        );
    }

    static findTask(filter?: TaskFilter): Task[] {
        let sql = 'SELECT * FROM task';
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

            // if (filter.id !== undefined) {
            //     conditions.push('id = ?');
            //     params.push(filter.id);
            // }

            // if (filter.name !== undefined) {
            //     conditions.push('name LIKE ?');
            //     params.push(`%${filter.name}%`);
            // }

            // if (filter.status !== undefined) {
            //     conditions.push('status = ?');
            //     params.push(filter.status);
            // }

            // if (filter.tag !== undefined) {
            //     conditions.push('tag = ?');
            //     params.push(filter.tag);
            // }

            // if (filter.priority !== undefined) {
            //     conditions.push('priority = ?');
            //     params.push(filter.priority);
            // }

            // if (filter.assigneeId !== undefined) {
            //     conditions.push('assigneeId = ?');
            //     params.push(filter.assigneeId);
            // }

            // if (filter.storyId !== undefined) {
            //     conditions.push('storyId = ?');
            //     params.push(filter.storyId);
            // }

            if (conditions.length > 0) {
                sql += ' WHERE ' + conditions.join(' AND ');
            }
        }
        const stmt = db.prepare(sql);
        return stmt.all(...params) as Task[];
    }

    static updateTask(id: string, updates: TaskUpdateData): boolean {
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

        const sql = `UPDATE task SET ${fields.join(', ')} WHERE id = ?`;
        const stmt = db.prepare(sql);
        const result = stmt.run(...params);

        return result.changes > 0;
    }

    static deleteTask(id: string): boolean {
        const stmt = db.prepare('DELETE FROM task WHERE id = ?');
        const result = stmt.run(id);

        return result.changes > 0;
    }
}

export default Task