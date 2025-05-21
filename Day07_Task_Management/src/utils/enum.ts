namespace Enums {
    export enum TaskStatus {
        ToDo = 'To Do',
        InProgress = 'In Progress',
        Done = 'Done'
    }

    export enum TaskPriority {
        High = 'High',
        Medium = 'Medium',
        Low = 'Low'
    }
    export function getEnumLength<T extends object>(enumObject: T): number {
        return Object.keys(enumObject).filter(key => isNaN(Number(key))).length;
    }
}

export default Enums