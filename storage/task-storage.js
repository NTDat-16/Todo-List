import { TASK_STATUS, EMPLOYEE_POSITION } from '../constants/constants.js';
import { Task } from '../schema/task.js';
import { Employee } from '../schema/Employee.js';
import { saveToStorage, loadFromStorage } from '../libs/libs.js';
export class TaskStorage {
  #storageKey;
  constructor(storageKey) {
    this.#storageKey = storageKey;
  }
  loadTasks() {
    const data = loadFromStorage(this.#storageKey);

    return data.map((item) => new Task(item.name, item.employeeId, item.status, item.id));
  }
  saveTasks(tasks) {
    saveToStorage(
      this.#storageKey,
      tasks.map((task) => task.serialize()),
    );
  }
}
