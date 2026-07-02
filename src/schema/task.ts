import { TASK_STATUS, TaskStatus } from '../constants/constants.js';

export class Task {
    #id:         string;
    #name:       string;
    #status:     TaskStatus;
    #employeeId: string;
    #time:       string;

    constructor(
        name:       string     = '',
        employeeId: string     = '',
        id:         string     = crypto.randomUUID(),
        status:     TaskStatus = TASK_STATUS.PENDING,
        time:       string     = ''
    ) {
        this.#id         = id;
        this.#name       = name;
        this.#status     = status;
        this.#employeeId = employeeId;
        this.#time       = time;
    }

    getId():         string     { return this.#id; }
    getName():       string     { return this.#name; }
    getStatus():     TaskStatus { return this.#status; }
    getEmployeeId(): string     { return this.#employeeId; }
    getTime():       string     { return this.#time; }

    setId(id: string):             void { this.#id         = id; }
    setName(name: string):         void { this.#name       = name; }
    setStatus(status: TaskStatus): void { this.#status     = status; }
    setEmployeeId(empId: string):  void { this.#employeeId = empId; }
    setTime(time: string):         void { this.#time       = time; }

   
    setTitle(name: string, time: string): void {
        this.#name = name;
        this.#time = time;
    }

    serialize() {
        return {
            id:         this.#id,
            name:       this.#name,
            status:     this.#status,
            employeeId: this.#employeeId,
            time:       this.#time
        };
    }
}