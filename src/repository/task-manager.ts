import { Task } from '../schema/task.js';
import { TASK_STATUS } from '../constants/constants.js';

export class TaskManager {
    #tasks: Task[] = [];

    constructor(tasks: Task[] = []) {
        this.#tasks = tasks;
    }

    addTask(name: string, employeeId: string): void {
        this.#tasks.push(new Task(name, employeeId));
    }

    changeTask(id: string): void {
        const task = this.#tasks.find(t => t.getId() === id);
        if (!task) return;
        task.setStatus(
            task.getStatus() === TASK_STATUS.PENDING
                ? TASK_STATUS.DONE
                : TASK_STATUS.PENDING
        );
    }

    removeTask(id: string): void {
        this.#tasks = this.#tasks.filter(t => t.getId() !== id);
    }

    getTasksByEmployee(employeeId: string): Task[] {
        return this.#tasks.filter(t => t.getEmployeeId() === employeeId);
    }

    getTasks(): Task[] { return this.#tasks; }
    getTask(id: string): Task | undefined {
        return this.#tasks.find(t => t.getId() === id);
    }
}