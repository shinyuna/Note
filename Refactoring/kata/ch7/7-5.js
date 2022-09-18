/**
 * 클래스 하나당 하나의 책임, 도메인을 갖고 있는 것이 중요하다.
 *
 * [문제]
 * Person 객체에서 전화번호와 관련된 로직이 있다. 이거슨 사람인가 전화번호인가?
 *
 * [해결]
 * - 전화번호 관련된 로직과 데이터를 TelephoneNumber 클래스로 분리한다.
 */

class Person {
  #name;
  #telephoneNumber
  constructor(name, telephoneNumber) {
    this.#name = name;
    this.#telephoneNumber = telephoneNumber
  }

  get name() {
    return this.#name;
  }

  set name(arg) {
    this.#name = arg;
  }

  get telephoneNumber() {
    return this.#telephoneNumber.toString
  }
}

class TelephoneNumber {
  #areaCode
  #phoneNumber
  constructor(areaCode, phoneNumber) {
    this.#areaCode = areaCode
    this.#phoneNumber = phoneNumber
  }

  get areaCode() {
    return this.#areaCode
  }

  get phoneNumber() {
    return this.#phoneNumber
  }

  set areaCode(value) {
    this.#areaCode = value
  }

  set phoneNumber(value) {
    this.#phoneNumber = value
  }

  get toString() {
    return `${this.#areaCode}${this.#phoneNumber}`
  }
}

const telephone = new TelephoneNumber('010', '12345678')
const person = new Person('엘리', telephone);
console.log(person.name);
console.log(person.telephoneNumber);
console.log(telephone.areaCode)
console.log(telephone.phoneNumber)
