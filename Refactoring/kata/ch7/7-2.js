/**
 * [기존 코드의 냄새]
 * Person 클래스의 course 컬렉션의 캡슐화가 전혀 되고 있지 않다.
 * 기존 값은 배열이였지만, set 할 때 어떤 데이터가 넘어올지도 알 수 없고 get 에서 컬렉션을 그대로 반환하기 때문에 외부에서 배열 값을 조작할 수도 있다.
 *
 * [냄새 해결 방법]
 * - 읽기전용 새로운 컬렉션을 반환한다.
 * - 컬렉션 자체가 아닌 클래스에서 제공하는 메서드로만 조작 가능하게 한다.
 */

export class Person {
  #name;
  #courses;
  constructor(name) {
    this.#name = name;
    this.#courses = [];
  }

  get name() {
    return this.#name;
  }

  get courses() {
    return [...this.#courses];
  }

  addCourse(course) {
    this.#courses.push(course)
  }

  removeCourse(course) {
    const id = this.#courses.indexOf(course)
    if (id === -1) {
      console.log('No course')
      return
    }
    this.#courses.splice(id, 1)
  }
}

export class Course {
  #name;
  #isAdvanced;
  constructor(name, isAdvanced) {
    this.#name = name;
    this.#isAdvanced = isAdvanced;
  }

  get name() {
    return this.#name;
  }

  get isAdvanced() {
    return this.#isAdvanced;
  }
}

const ellie = new Person('엘리');
const course = new Course('리팩토링', true)
ellie.addCourse(course)
console.log(ellie.courses.length);
ellie.removeCourse(course)
ellie.removeCourse(course)
console.log(ellie.courses.length);
