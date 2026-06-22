import { TASK_STATUS, EMPLOYEE_POSITION } from "../constants/constants.js";
import { Task, Employee } from "../schema/task.js";
import { saveToStorage, loadFromStorage } from "../libs/libs.js";
export class TaskStorage {
  #storageKey;
  constructor(storageKey) {
    this.#storageKey = storageKey;
  }
  loadTasks() {
    const data = loadFromStorage(this.#storageKey);
    return data.map((item) => {
      const task = new Task(item.name, item.employeeId);
      task.setId(item.id);
      if (item.status === TASK_STATUS.DONE) task.setStatus(TASK_STATUS.DONE);
      return task;
    });
  }
  saveTasks(tasks) {
    saveToStorage(
      this.#storageKey,
      tasks.map((task) => task.toJSON()),
    );
  }
}
// employee
export class EmployeeStorage {
  #storageKey;
  constructor(storageKey) {
    this.#storageKey = storageKey;
  }
  loadEmployees() {
    const data = loadFromStorage(this.#storageKey);
    return data.map((item) => {
      const employee = new Employee(item.name, item.position);
      employee.setId(item.id);
      return employee;
    });
  }
  saveEmployees(employees) {
    saveToStorage(
      this.#storageKey,
      employees.map((e) => e.toJSON()),
    );
  }
}
