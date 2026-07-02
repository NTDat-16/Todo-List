import { Employee } from '../schema/employee.js';
import { EmployeePosition } from '../constants/constants.js';
import { saveToStorage, loadFromStorage } from '../libs/libs.js';

export class EmployeeStorage {
    #storageKey: string;

    constructor(storageKey: string) {
        this.#storageKey = storageKey;
    }

    loadEmployees(): Employee[] {
        const data = loadFromStorage(this.#storageKey);
        return data.map((item: any) =>
            new Employee(item.name, item.position as EmployeePosition, item.id)
        );
    }

    saveEmployees(employees: Employee[]): void {
        saveToStorage(this.#storageKey, employees.map(e => e.serialize()));
    }
}