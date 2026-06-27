import { TASK_STATUS,EMPLOYEE_POSITION } from "../constants/constants.js";
export class Task {
  #id;
  #name;
  #status;
  #employeeId;
  constructor(name, employeeId,status=TASK_STATUS.PENDING, id= crypto.randomUUID()) {
    this.#id = id;
    this.#name = name;
    this.#status = status;
    this.#employeeId = employeeId;
  }
  getId() {
    return this.#id;
  }
  getName() {
    return this.#name;
  }
  getStatus() {
    return this.#status;
  }
  setName(name) {
    this.#name = name;
  }
  setId(id) {
    this.#id = id;
  }
  setStatus(status) {
    this.#status = status;
  }
  getEmployeeId() {
    return this.#employeeId;
  }
  serialize() {
    return {
      id: this.#id,
      name: this.#name,
      status: this.#status,
      employeeId: this.#employeeId,
    };
  }
}
