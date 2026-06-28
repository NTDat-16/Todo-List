import { EMPLOYEE_POSITION, EmployeePosition } from '../constants/constants.js';

export class Employee {
  #id: string;
  #name: string;
  #position: EmployeePosition;

  constructor(
    name: string,
    position: EmployeePosition = EMPLOYEE_POSITION.EMPLOYEE,
    id: string = crypto.randomUUID(),
  ) {
    this.#id = id;
    this.#name = name;
    this.#position = position;
  }

  getId(): string {
    return this.#id;
  }
  getName(): string {
    return this.#name;
  }
  getPosition(): EmployeePosition {
    return this.#position;
  }

  setName(name: string): void {
    this.#name = name;
  }
  setPosition(position: EmployeePosition): void {
    this.#position = position;
  }

  serialize() {
    return { id: this.#id, name: this.#name, position: this.#position };
  }
}
