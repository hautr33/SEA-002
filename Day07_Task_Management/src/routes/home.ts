import { Router, Request, Response } from 'express';
import Task from '../models/task';
import Enums from '../utils/enum';

const router = Router();
type StatusType = `${Enums.TaskStatus}`

router.get('/', (req: Request, res: Response) => {
    const tasks = Task.find()
    const status = Enums.TaskStatus
    const stories: string[] = Task.getStoriesId()
    const owners: string[] = Task.getOwnersId()
    const priority = Enums.TaskPriority
    const storyColors = generateDynamicColors(stories, 40, 60);
    const tagColors = generateDynamicColors(Task.getTag(), 30, 70);
    res.render('home', { tasks, status, priority, stories, owners, storyColors, tagColors });
});

router.get('/search', (req: Request, res: Response) => {
    const action = req.query.action;

    if (action === 'search') {
        const searchOption: any = {}
        if (req.query.name) {
            searchOption.name = req.query.name;
        }
        if (req.query.tag) {
            searchOption.tag = req.query.tag;
        }
        if (req.query.priority) {
            searchOption.priority = req.query.priority;
        }
        if (req.query.ownerId) {
            searchOption.ownerId = req.query.ownerId;
        }
        if (req.query.storyId) {
            searchOption.storyId = req.query.storyId;
        }
        const tasks = Task.find(searchOption)
        const status = Enums.TaskStatus
        const stories: string[] = Task.getStoriesId()
        const owners: string[] = Task.getOwnersId()
        const priority = Enums.TaskPriority
        const storyColors = generateDynamicColors(stories);
        const tagColors = generateDynamicColors(stories);
        res.render('home', { tasks, status, priority, stories, owners, searchOption, storyColors, tagColors });
    } else if (action === 'reset') {
        res.redirect('/')
    }

});

function generateDynamicColors(storyIds: string[], brightness: number = 70, saturation: number = 60): Record<string, string> {
    const map: Record<string, string> = {};
    const total = storyIds.length;

    storyIds.forEach((storyId, index) => {
        const hue = Math.floor((360 / total) * index);
        const color = `hsl(${hue}, ${brightness}%, ${saturation}%)`; // brightness, saturation
        map[storyId] = color;
    });

    return map;
}

export default router;