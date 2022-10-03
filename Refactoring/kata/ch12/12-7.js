/**
 * - 단순히 타입이 다르다고 서브 클래스를 만드는 것은 오버 엔지니어링이 될 수 있다.
 * - 서브 클래스마다 고유한 행동이 있다면, 서브 클래스를 사용하는 것이 좋지만, 아주 사소한 속성 하나가 다르다고 서브 클래스를 만드는 것 보다 클래스 하나로 관리하는 것이 더 나을 때도 있다.
 * -> 100% 정답은 없다!!!!!!!!!!!
 *
 * - 외부에서 알 필요 없는 로직은 내부로 캡슐화, 외부에서 사용하기 쉽게 팩토리 메소드 제공
 */

class Person {
  #name;
  #genderCode;
  constructor(name, genderCode) {
    this.#name = name;
    this.#genderCode = genderCode;
  }

  get name() {
    return this.#name;
  }

  get genderCode() {
    return this.#genderCode;
  }

  get isMale() {
    return this.genderCode === 'M'
  }

  static create(record) {
    switch (record.gender) {
      case 'M':
        return new Person(record.name, 'M');
      case 'F':
        return new Person(record.name, 'F');
      default:
        return new Person(record.name, 'X');
    }
  }
}

function loadFromInput(data) {
  return data.forEach((record) => result.push(Person.create(record)));
}

const people = loadFromInput([
  { name: '엘리', gender: 'F' },
  { name: '철수', gender: 'M' },
  { name: '밥', gender: 'M' },
]);
const numberOfMales = people.filter((p) => p.isMale()).length;
console.log(numberOfMales);
