import { Task } from '../schema/task.js';
import { TASK_STATUS } from '../constants/constants.js';
export class TaskManager {
    #tasks = [];
    constructor(tasks = []) {
        this.#tasks = tasks;
    }
    addTask(name, employeeId) {
        this.#tasks.push(new Task(name, employeeId));
    }
    changeTask(id) {
        const task = this.#tasks.find(t => t.getId() === id);
        if (!task)
            return;
        task.setStatus(task.getStatus() === TASK_STATUS.PENDING
            ? TASK_STATUS.DONE
            : TASK_STATUS.PENDING);
    }
    removeTask(id) {
        this.#tasks = this.#tasks.filter(t => t.getId() !== id);
    }
    getTasksByEmployee(employeeId) {
        return this.#tasks.filter(t => t.getEmployeeId() === employeeId);
    }
    getTasks() { return this.#tasks; }
    getTask(id) {
        return this.#tasks.find(t => t.getId() === id);
    }
}
//# sourceMappingURL=task-manager.js.map