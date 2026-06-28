import { Task } from '../schema/task.js';
import { TaskStatus } from '../constants/constants.js';
import { saveToStorage, loadFromStorage } from '../libs/libs.js';

export class TaskStorage {
    #storageKey: string;

    constructor(storageKey: string) {
        this.#storageKey = storageKey;
    }

    loadTasks(): Task[] {
        const data = loadFromStorage(this.#storageKey);
        return data.map((item: any) =>
            new Task(item.name, item.employeeId, item.id, item.status as TaskStatus)
        );
    }

    saveTasks(tasks: Task[]): void {
        saveToStorage(this.#storageKey, tasks.map(t => t.serialize()));
    }
}