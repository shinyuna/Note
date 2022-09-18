/**
 * [문제]
 *  내부적으로 사용하는 데이터를 외부에 지나치게 노출한다.
 *
 * [해결]
 *  외부에선 어떤 데이터에 접근해서 가져오는지 알 수 없도록 한다. -> 위임 숨기기
 *  ex. "이 사람의 매니저가 누구얏!!"
 *  ---> 이 백화점의 이 매니져요 X
 *  ---> 이 매니저요 O
 *
 *  [Note]
 *  중개자, 위임 = Composition
 *  ---> A 가 B 라는 클래스르 내부적으로 갖고 있다.
 */

class Person {
  #name;
  #department;
  constructor(name, department) {
    this.#name = name;
    this.#department = department;
  }

  get name() {
    return this.#name;
  }

  set department(arg) {
    this.#department = arg;
  }

  get chargeCode() {
    return this.#department.chargeCode;
  }

  get manager() {
    return this.#department.manager
  }

}

export class Department {
  #manager;
  #chargeCode;
  constructor(manager, chargeCode) {
    this.#manager = manager;
    this.#chargeCode = chargeCode;
  }

  get chargeCode() {
    return this.#chargeCode;
  }

  set chargeCode(arg) {
    this.#chargeCode = arg;
  }

  get manager() {
    return this.#manager;
  }

  set manager(arg) {
    this.#manager = arg;
  }
}

const person = new Person('Tom', new Department('aManager', '999'));
console.log(person.name);
console.log(person.manager);
console.log(person.chargeCode);
