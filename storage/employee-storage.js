import { EMPLOYEE_POSITION } from "../constants/constants.js";
import {  Employee } from "../schema/Employee.js";
import { saveToStorage, loadFromStorage } from "../libs/libs.js";
export class EmployeeStorage {
  #storageKey;
  constructor(storageKey) {
    this.#storageKey = storageKey;
  }
  loadEmployees() {
    const data = loadFromStorage(this.#storageKey);
    return data.map((item) => {
      const employee = new Employee(item.name, item.position,item.id);
      return employee;
    });
  }
  saveEmployees(employees) {
    saveToStorage(
      this.#storageKey,
      employees.map((e) => e.serialize()),
    );
  }
}
