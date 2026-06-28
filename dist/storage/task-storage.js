import { Task } from '../schema/task.js';
import { saveToStorage, loadFromStorage } from '../libs/libs.js';
export class TaskStorage {
    #storageKey;
    constructor(storageKey) {
        this.#storageKey = storageKey;
    }
    loadTasks() {
        const data = loadFromStorage(this.#storageKey);
        return data.map((item) => new Task(item.name, item.employeeId, item.id, item.status));
    }
    saveTasks(tasks) {
        saveToStorage(this.#storageKey, tasks.map(t => t.serialize()));
    }
}
//# sourceMappingURL=task-storage.js.map