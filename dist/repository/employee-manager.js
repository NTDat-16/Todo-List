import { Employee } from '../schema/employee.js';
export class EmployeeManager {
    #employees = [];
    constructor(employees = []) {
        this.#employees = employees;
    }
    addEmployee(name, position) {
        this.#employees.push(new Employee(name, position));
    }
    removeEmployee(id) {
        this.#employees = this.#employees.filter(e => e.getId() !== id);
    }
    updatePosition(id) {
        const emp = this.#employees.find(e => e.getId() === id);
        if (!emp)
            return;
        emp.setPosition(emp.getPosition() === 'employee' ? 'manager' : 'employee');
    }
    getEmployees() { return this.#employees; }
    getEmployee(id) {
        return this.#employees.find(e => e.getId() === id);
    }
}
//# sourceMappingURL=employee-manager.js.map