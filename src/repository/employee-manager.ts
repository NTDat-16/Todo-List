import { Employee } from '../schema/employee.js';
import { EmployeePosition } from '../constants/constants.js';

export class EmployeeManager {
    #employees: Employee[] = [];

    constructor(employees: Employee[] = []) {
        this.#employees = employees;
    }

    addEmployee(name: string, position: EmployeePosition): void {
        this.#employees.push(new Employee(name, position));
    }

    removeEmployee(id: string): void {
        this.#employees = this.#employees.filter(e => e.getId() !== id);
    }

    updatePosition(id: string): void {
        const emp = this.#employees.find(e => e.getId() === id);
        if (!emp) return;
        emp.setPosition(
            emp.getPosition() === 'employee' ? 'manager' : 'employee'
        );
    }

    getEmployees(): Employee[]              { return this.#employees; }
    getEmployee(id: string): Employee | undefined {
        return this.#employees.find(e => e.getId() === id);
    }
}