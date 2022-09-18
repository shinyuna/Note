/**
 * 중개자(Composition) 제거하기
 * - 복잡한 로직이 있지 않는 이상, 밀접하게 연관되어 있는 데이터는 지나치게 세부적으로 분리하지 않아도 된다.
 * - 건너건너 접근하는 것 보단, 하나의 클래스로 통합해 바로 접근하는 것이 좋다.
 */

class Person {
  #name;
  #manager;
  #chargeCode;
  constructor(name, manager, chargeCode) {
    this.#name = name;
    this.#manager = manager
    this.#chargeCode = chargeCode
  }

  get name() {
    return this.#name;
  }

  get chargeCode() {
    return this.#chargeCode;
  }

  get manager() {
    return this.#manager
  }

  set name(arg) {
    this.#name = arg;
  }

  set chargeCode(arg) {
    this.#chargeCode = arg;
  }

  set manager(arg) {
    this.#manager = arg;
  }

}

const person = new Person('Tom','aManager', '999');
console.log(person.name);
console.log(person.manager);
console.log(person.chargeCode);
