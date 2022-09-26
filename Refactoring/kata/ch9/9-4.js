/**
 * :NOTE
 * - 값: 불변성, 원시 값은 재할당은 가능하지만 변할 순 없다.
 * - 참조: 가변성, (object) 데이터 자체를 변경 가능하다.
 *
 * [참조 값의 문제]
 * - 실수로 참조 값 자체를 리턴하게 되면, 외부에서 내부 메서드를 통해 값을 조작할 수 있다.
 *
 * [해결]
 * - 값을 업데이트 할 때 마다, 새로운 인스턴스를 생성해서 리턴한다.
 * 🤔 새로운 인스턴스 -> 메모리 최적화 문제가 걱정 된다면, 계속 말하는 아직은 하지마라를 기억해라.
 * - 최적화 < 안정성
 */
class Person {
  #name;
  #telephoneNumber;
  constructor(name, areaCode, number) {
    this.#name = name;
    this.#telephoneNumber = new TelephoneNumber(areaCode, number);
  }

  get name() {
    return this.#name;
  }

  set name(arg) {
    this.#name = arg;
  }

  get telephoneNumber() {
    return this.#telephoneNumber;
  }

  get officeAreaCode() {
    return this.#telephoneNumber.areaCode;
  }

  set officeAreaCode(value) {
    this.#telephoneNumber = new TelephoneNumber(value, this.officeNumber);
  }

  get officeNumber() {
    return this.#telephoneNumber.number;
  }

  set officeNumber(value) {
    this.#telephoneNumber = new TelephoneNumber(this.officeAreaCode, value);
  }
}

class TelephoneNumber {
  #areaCode;
  #number;
  constructor(area, number) {
    this.#areaCode = area;
    this.#number = number;
  }

  get areaCode() {
    return this.#areaCode;
  }

  get number() {
    return this.#number;
  }

  get toString() {
    return `(${this.#areaCode}) ${this.#number}`;
  }
}

const person = new Person('엘리', '010', '12345678');
console.log(person.name);
person.officeNumber = '90244573';
person.telephoneNumber.officeNumber = '123';
console.log(person.officeAreaCode);
console.log(person.officeNumber);
console.log(person.telephoneNumber.toString);
