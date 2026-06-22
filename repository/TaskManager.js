import { Task } from "../schema/task.js";
import {Employee} from "../schema/Employee.js"
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
  loadFromJson(data) {
    data.forEach((item) => {
      const task = new Task(item.name);
      if (item.status === TASK_STATUS.DONE) task.changeStatus();
      this.#tasks.push(task);
    });
  }
  saveTask() {
    return this.#tasks.map((task) => task.saveTask());
  }
}
