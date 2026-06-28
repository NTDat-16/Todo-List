import { TASK_STATUS, TaskStatus } from '../constants/constants.js';

export class Task {
    #id: string;
    #name: string;
    #status: TaskStatus;
    #employeeId: string;

    constructor(
        name: string,
        employeeId: string,
        id: string = crypto.randomUUID(),
        status: TaskStatus = TASK_STATUS.PENDING
    ) {
        this.#id         = id;
        this.#name       = name;
        this.#status     = status;
        this.#employeeId = employeeId;
    }

    getId():         string      { return this.#id; }
    getName():       string      { return this.#name; }
    getStatus():     TaskStatus  { return this.#status; }
    getEmployeeId(): string      { return this.#employeeId; }

    setName(name: string):         void { this.#name   = name; }
    setStatus(status: TaskStatus): void { this.#status = status; }

    serialize() {
        return {
            id:         this.#id,
            name:       this.#name,
            status:     this.#status,
            employeeId: this.#employeeId
        };
    }
}