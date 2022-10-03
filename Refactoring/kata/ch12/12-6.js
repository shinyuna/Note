class Employee {
  #name;
  constructor(name) {
    this.#name = name;
  }

  get type() {
    return 'employee'
  }

  toString() {
    return `${this.#name} (${this.type})`;
  }

  static createEmployee(name, type) {
    switch (type) {
      case 'engineer':
        return new Engineer(name)
      case 'manager':
        return new Manager(name)
      case 'salesperson':
        return new Salesperson(name)
      default:
        return throw new Error(`${type}라는 직원 유형은 없습니다.`);
    }
  }
}

class Engineer extends Employee {
  get type() {
    return 'engineer'
  }
}

class Manager extends Employee {
  get type() {
    return 'manager'
  }
}

class Salesperson extends Employee {
  get type() {
    return 'manager'
  }
}

const ellie = new Engineer('엘리');
const bob = new Manager('밥');

/**
 * [문제]
 * - employee type 속성이 있지만, 어떤 type 을 정의 할 수 있는지 알 수가 없다.
 * - 직접 정의 할 수 없는 상황(ex. 서버의 JSON 데이터를 통해 인스턴스를 만들 때)엔 팩토리 패턴을 통해 인스턴스를 만들도록 한다.
 */