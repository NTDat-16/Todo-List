import { Task } from "../schema/task.js";
import {Employee} from "../schema/employee.js"
import { TASK_STATUS } from "../constants/constants.js";

export class TaskManager {
  #tasks = [];
  constructor(tasks = []) {
    this.#tasks = tasks;
  }

  addTask(taskName, employeeId) {
    const task = new Task(taskName, employeeId);
    this.#tasks.push(task);
  }

  changeTask(id) {
    const task = this.#tasks.find((t) => t.getId() === id);
    if (!task) return;
    task.setStatus(
      task.getStatus() === TASK_STATUS.PENDING
        ? TASK_STATUS.DONE
        : TASK_STATUS.PENDING,
    );
  }
  removeTask(id) {
    this.#tasks = this.#tasks.filter((t) => t.getId() !== id);
  }
  getTasks() {
    return this.#tasks;
  }
  getTask(index) {
    return this.#tasks[index];
  }
  
}
