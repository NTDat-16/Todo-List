import { Employee } from '../schema/employee.js';
import { saveToStorage, loadFromStorage } from '../libs/libs.js';
export class EmployeeStorage {
    #storageKey;
    constructor(storageKey) {
        this.#storageKey = storageKey;
    }
    loadEmployees() {
        const data = loadFromStorage(this.#storageKey);
        return data.map((item) => new Employee(item.name, item.position, item.id));
    }
    saveEmployees(employees) {
        saveToStorage(this.#storageKey, employees.map(e => e.serialize()));
    }
}
//# sourceMappingURL=employee-storage.js.map