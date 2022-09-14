let defaultOwner = { firstName: '마틴', lastName: '파울러' };

// best
class Person {
  #firstName;
  #lastName;

  constructor(firstName, lastName) {
    this.#firstName = firstName
    this.#lastName = lastName
  }

  get firstName() {
    return this.#firstName
  }

  get lastName() {
    return this.#lastName
  }
}

defaultOwner = new Person({ firstName: '마틴', lastName: '파울러' })

export function getDefaultOwner() {
  return defaultOwner
}

/**
 * 객체 자체는 변경이 가능하다. mutable <- 💩 (use 코드 참고)
 * - 객체를 담는 변수는 객체를 담고 있는 메모리 주소의 참조 값을 담고 있어 객체를 반환하면, 참조 값을 반환한다.
 * - 반환한 객체에 접근하면, 같은 객체에 접근하는 것이라 값을 변경하면 기존 객체의 값이 변경된다.
 *
 * 일반적인 spread operator는 중첩 객체까진 복사하지 못한다. <- 얕은 복사
 * - 중첩 객체는 기존 객체의 참조 값을 바라본다.
 *
 * 클래스를 사용해 얕은 복사를 방지한다.
 * - private filed 로 설정하고 getter만 제공해 데이터 변경은 막고, 접근만 가능하도록 한다.
 */
