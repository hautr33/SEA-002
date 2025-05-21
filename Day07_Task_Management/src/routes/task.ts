import { Router, Request, Response } from 'express';
import Task from '../models/task';
import Enums from '../utils/enum';

const router = Router();



router.get('/add', (req: Request, res: Response) => {
    const status = Enums.TaskStatus
    const stories: string[] = Task.getStoriesId()
    const owners: string[] = Task.getOwnersId()
    const priority = Enums.TaskPriority
    res.render('task-add', { status, priority, stories, owners });

})

router.post('/add', (req: Request, res: Response) => {
    const {
        name,
        tag,
        priority,
        estimateValue,
        estimateUnit,
        dueDate,
        ownerId,
        storyId
    } = req.body;
    if (!name || !priority || !estimateValue || !estimateUnit) {
        res.render('task-add', { message: 'Fail to add new task.' });
    }

    const estimateTime = `${estimateValue}${estimateUnit}`; // Ví dụ: "5h"
    const task = new Task(name, tag, priority, estimateTime, dueDate, ownerId, storyId)
    task.save()
    res.redirect('/');
})

router.get('/:id', (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const task = Task.find({ id: taskId })[0] as Task
        const status = Enums.TaskStatus
        const stories: string[] = Task.getStoriesId()
        const owners: string[] = Task.getOwnersId()
        const priority = Enums.TaskPriority
        res.render('task-info', { task, status, priority, stories, owners });
    } catch (error) {
        throw new Error(`Get task error: ${error}`);
    }
})

router.post('/delete/:id', (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        Task.delete(taskId)
        res.redirect(`/`);
    } catch (error) {
        throw new Error(`Get task error: ${error}`);
    }
})

router.post('/update/:id', (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        console.log(req.body)
        const updateOption: any = {}
        if (req.body.name) {
            updateOption.name = req.body.name;
        }
        if (req.body.status) {
            updateOption.status = req.body.status;
        }
        if (req.body.tag) {
            updateOption.tag = req.body.tag;
        }
        if (req.body.priority) {
            updateOption.priority = req.body.priority;
        }
        if (req.body.estimateValue) {
            updateOption.estimateValue = req.body.estimateValue;
        }
        if (req.body.dueDate) {
            updateOption.dueDate = req.body.dueDate;
        }
        if (req.body.ownerId) {
            updateOption.ownerId = req.body.ownerId;
        }
        if (req.body.storyId) {
            updateOption.storyId = req.body.storyId;
        }
        console.log(updateOption)
        Task.update(taskId, updateOption)
        res.redirect(`/`);
    } catch (error) {
        throw new Error(`Get task error: ${error}`);
    }
})

router.post('/:id/update-status', (req: Request, res: Response) => {
    const taskId = req.params.id;
    const status = req.body.status;

    // Gọi DB update trạng thái task
    if (status in Enums.TaskStatus) {
        Task.update(taskId, { status: Enums.TaskStatus[status as keyof typeof Enums.TaskStatus] });
        res.json({ success: true, message: 'Status updated successfully' });
    } else {
        throw new Error(`Invalid status: ${status}`);
    }
})


export default router;
