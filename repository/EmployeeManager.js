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

  getEmployees() {
    return this.#employees;
  }
  getEmployee(id) {
    return this.#employees.find((e) => e.getId() === id);
  }
}
