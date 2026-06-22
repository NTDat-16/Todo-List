export class Employee {
  #id;
  #name;
  #position;

  constructor(name, position = EMPLOYEE_POSITION.EMPLOYEE) {
    this.#id = crypto.randomUUID();
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
  setId(id) {
    this.#id = id;
  }
  setName(name) {
    this.#name = name;
  }
  setPosition(position) {
    this.#position = position;
  }

  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      position: this.#position,
    };
  }
}
