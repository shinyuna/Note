/**
 * [코드에 있는 문제]
 * - 한 개의 속성만 받고 있는데 레코드로 받는다.
 * - 외부에 내부 데이터를 활용하는 로직이 있다.
 *
 * [문제를 해결하고 좋아진 점]
 * - 메서드의 이름만으로 목적을 파악할 수 있다.
 * - 데이터를 계산하는 로직이 변경되도 클래스 내부 메서드만 변경하면 모든 코드에 적용되기 때문에 재사용성과 중복 코드 제거에 효과적이다.
 *
 * [주의]
 * - 모든 기본형을 클래스 형태로 바꾸지 않아도 된다. 프로젝트에서 자주 사용되는 기본형들을 enum 또는 클래스 형태로 관리하는 것이 좋다.
 */

export class Order {
  constructor(priority) {
    this.priority = priority;
  }

  isHighPriority() {
    return this.priority.higherThan(new Priority('normal'))
  }
}

class Priority {
  #priority
  constructor(priority) {
    if (!Priority.legalPriority().includes(priority)) {
      throw new Error(`${priority} is invalid for Priority`) // 생성자 안에서 에러를 뱉는 것은 보안상 좋지 않다.
    }
    this.#priority = priority
  }

  get index() {
    return Priority.legalPriority().indexOf(this.#priority)
  }

  static legalPriority() {
    return ['row', 'normal', 'high', 'rush']
  }

  equals(other) {
    return this.index === other.index
  }

  higherThan(other) {
    return this.index > other.index
  }

}

const orders = [
  new Order(new Priority('normal')),
  new Order(new Priority('high')),
  new Order(new Priority('rush')),
];

const highPriorityCount = orders.filter((o) => o.isHighPriority()).length;

console.log(highPriorityCount)