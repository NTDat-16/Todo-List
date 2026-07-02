import { EMPLOYEE_POSITION, EmployeePosition } from '../constants/constants.js';
import { Task } from './task.js';

export class Employee {
    #id:       string;
    #name:     string;
    #position: EmployeePosition;
    #tasks:    Task[] = []; 
    constructor(
        name:     string           = '',
        position: EmployeePosition = EMPLOYEE_POSITION.EMPLOYEE,
        id:       string           = crypto.randomUUID()
    ) {
        this.#id       = id;
        this.#name     = name;
        this.#position = position;
    }

    getId():       string           { return this.#id; }
    getName():     string           { return this.#name; }
    getPosition(): EmployeePosition { return this.#position; }
    getTasks():    Task[]           { return this.#tasks; }

    setId(id: string):                   void { this.#id       = id; }
    setName(name: string):               void { this.#name     = name; }
    setPosition(pos: EmployeePosition):  void { this.#position = pos; }

    addTask(task: Task): void {
        task.setEmployeeId(this.#id);
        this.#tasks.push(task);
    }

    serialize() {
        return { id: this.#id, name: this.#name, position: this.#position };
    }
}