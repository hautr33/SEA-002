import db from '../config/database'
import Enums from "../utils/enum";

type StatusType = `${Enums.TaskStatus}`
type PriorityType = `${Enums.TaskPriority}`

class Story {
    private id: string;
    private name: string;
    private status: StatusType;
    private tag: string;
    private priority: PriorityType;
    private ownerId: string;
    private sprintId: string;
    private counter: number = 1;

    constructor(name: string, status: StatusType, tag: string, priority: PriorityType, ownerId: string, sprintId: string) {
        this.id = `story${this.counter++}`
        this.name = name;
        this.status = status;
        this.tag = tag;
        this.priority = priority;
        this.ownerId = ownerId;
        this.sprintId = sprintId;
    }

    static generateStory() {
        const result = db.prepare('SELECT 1 FROM story LIMIT 1').get();
        const priorities: Enums.TaskPriority[] = Object.values(Enums.TaskPriority);
        const statuses: Enums.TaskStatus[] = Object.values(Enums.TaskStatus);
        if (!result) {
            for (let i = 1; i <= 20; i++) {
                const name = `Story ${i}`;
                const status = statuses[Math.floor(Math.random() * 3)];
                const tag = i % 2 === 0 ? 'tag1' : 'tag2';
                const priority = priorities[Math.floor(Math.random() * 3)]
                const ownerId = `user-${Math.ceil(Math.random() * 5)}`;
                const sprintId = `sprint-${Math.ceil(Math.random() * 3)}`;

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
}

export default Story