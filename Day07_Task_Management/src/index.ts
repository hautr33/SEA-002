import Task from './models/task'

Task.generateTask()

// console.log(Task.findTask({ id: '8baa3500-4a32-4609-9319-230030052dfb' }))
console.log(Task.updateTask('8baa3500-4a32-4609-9319-230030052dfb', { name: 'Task 20' }))
// console.log(Task.findTask({ id: '8baa3500-4a32-4609-9319-230030052dfb' }))
const task = new Task('T21', 'game', 'Low', '2h', '2025-05-14', 'user-1', 'story-1')
task.save()
console.log(Task.findTask({ name: '21' }))
Task.deleteTask(task.getId())
console.log(Task.findTask({ name: '21' }))
