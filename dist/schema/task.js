import { TASK_STATUS } from '../constants/constants.js';
export class Task {
    #id;
    #name;
    #status;
    #employeeId;
    constructor(name, employeeId, id = crypto.randomUUID(), status = TASK_STATUS.PENDING) {
        this.#id = id;
        this.#name = name;
        this.#status = status;
        this.#employeeId = employeeId;
    }
    getId() { return this.#id; }
    getName() { return this.#name; }
    getStatus() { return this.#status; }
    getEmployeeId() { return this.#employeeId; }
    setName(name) { this.#name = name; }
    setStatus(status) { this.#status = status; }
    serialize() {
        return {
            id: this.#id,
            name: this.#name,
            status: this.#status,
            employeeId: this.#employeeId
        };
    }
}
//# sourceMappingURL=task.js.map