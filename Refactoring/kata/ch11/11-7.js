/**
 * :NOTE
 * - 데이터가 읽기 전용인지 쓰기도 가능한지 명확하게 캡슐화 해두는 것이 중요하다.
 * - 쓰기도 가능할 떈 항상 setter 를 통해 데이터를 업데이트 해줘야 한다.
 */
class Person {
  get name() {}
  set name(value) {}
}
