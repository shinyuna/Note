class Employee {
  #name;
  #type;
  constructor(name, type) {
    this.validateType(type);
    this.#name = name;
    this.#type = type;
  }

  validateType(arg) {
    if (!['engineer', 'manager', 'salesperson'].includes(arg)) {
      throw new Error(`${arg}라는 직원 유형은 없습니다.`);
    }
  }

  get type() {
    return this.#type;
  }

  toString() {
    return `${this.#name} (${this.type})`;
  }
}

const ellie = new Employee('엘리', 'engineer');
const bob = new Employee('밥', 'manager');
