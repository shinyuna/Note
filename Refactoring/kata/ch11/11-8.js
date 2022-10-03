/**
 * :NOTE
 * 팩토리 함수 : 인스턴스를 만드는 로직 자체를 캡슐화 해서 외부에서 간단하게 인스턴스를 생성하도록 할 때 사용한다.
 * - javascript 외의 다른 언어에서는 constructor 함수를 private 로 설정할 수 있어 외부에서 생성자 함수에 접근하지 못하도록 할 수 있다.
 * - 외부에서 생성자 함수에 직접 접근해서 인스턴스를 생성하는 것이 아니라, 미리 정의한 팩토리 함수를 통해 인스턴스를 생성한다.
 */

export class Employee {
  constructor(name, typeCode) {
    this._name = name;
    this._typeCode = typeCode;
  }
  get name() {
    return this._name;
  }

  get type() {
    return Employee.legalTypeCodes[this._typeCode];
  }

  static get legalTypeCodes() {
    return { E: 'Engineer', M: 'Manager', S: 'Salesman' };
  }

  static createEngineer(name) {
    return new Employee(name, 'E')
  }
}

const engineer1 = new Employee('융디', 'E') // X
const engineer2 = Employee.createEngineer('융디') // O
