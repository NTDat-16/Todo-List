import { Employee } from '../schema/employee.js';
import { EMPLOYEE_POSITION } from '../constants/constants.js';
export class EmployeeManager {
  #employees = [];

  constructor(employees = []) {
    this.#employees = employees;
  }

  addEmployee(name, position) {
    this.#employees.push(new Employee(name, position));
  }

  removeEmployee(id) {
    this.#employees = this.#employees.filter((e) => e.getId() !== id);
  }
  updatePosition(id) {
    const employee = this.#employees.find((e) => e.getId() === id);
    if (!employee) return;
    const currentPosition = employee.getPosition();
    const newPosition =
      currentPosition === EMPLOYEE_POSITION.EMPLOYEE
        ? EMPLOYEE_POSITION.MANAGER
        : EMPLOYEE_POSITION.EMPLOYEE;

    employee.setPosition(newPosition);
  }
  getEmployees() {
    return this.#employees;
  }
  getEmployee(id) {
    return this.#employees.find((e) => e.getId() === id);
  }
}
