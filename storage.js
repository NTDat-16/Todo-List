import { TASK_STATUS } from "./constants.js";
import {Task} from "./schema.js"
import {saveToStorage,loadFromStorage} from "./libs.js"
export class TaskStorage {
    #storageKey;
    constructor(storageKey){
        this.#storageKey=storageKey;
    }
     loadTasks() {
        const data = loadFromStorage(this.#storageKey);
        return data.map(item => {
            const task = new Task(item.name);
            if (item.status === TASK_STATUS.DONE) task.setStatus(TASK_STATUS.DONE);
            return task;
        });
    }
    saveTasks(tasks) {
        saveToStorage(this.#storageKey, tasks.map(task => task.saveTask()));
    }
}