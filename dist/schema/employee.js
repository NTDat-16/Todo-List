import { EMPLOYEE_POSITION } from '../constants/constants.js';
export class Employee {
    #id;
    #name;
    #position;
    constructor(name, position = EMPLOYEE_POSITION.EMPLOYEE, id = crypto.randomUUID()) {
        this.#id = id;
        this.#name = name;
        this.#position = position;
    }
    getId() {
        return this.#id;
    }
    getName() {
        return this.#name;
    }
    getPosition() {
        return this.#position;
    }
    setName(name) {
        this.#name = name;
    }
    setPosition(position) {
        this.#position = position;
    }
    serialize() {
        return { id: this.#id, name: this.#name, position: this.#position };
    }
}
//# sourceMappingURL=employee.js.map