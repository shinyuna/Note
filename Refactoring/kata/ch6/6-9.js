/**
 * [불편] 같은 데이터를 다루는 함수들이 여러 파일에 흩뿌려져 있어 코드를 해석하기 어렵고 집중도 잘 안된다.
 * - 이 데이터는 뭐였더라 하면서 파일 왔다갔다 하는 시간 낭비
 * -> 코드 가독성/집중력 저하
 *
 * [냄새 원인]
 * - 데이터와 데이터를 사용하는 함수가 여러 파일에 흩어져 있다.
 * - 코드 중복, 재사용성, 유지 보수성 저하
 *
 * [해결책]
 * - 데이터와 함수를 하나의 클래스로 응집화 한다.
 * - 외부에서 데이터를 변경하지 못하도록 private field로 get만 제공하는게 좋다.
 *
 * [이점]
 * - 필요한 데이터에 바로 접근 가능 -> 가독성
 * - 외부에서 계산을 반복하지 않아도 된다 -> 중복 코드 제거
 */

export class Reading {
  #customer;
  #quantity;
  #month;
  #year;
  constructor(data) {
    this.#customer = data.customer;
    this.#quantity = data.quantity;
    this.#month = data.month;
    this.#year = data.year;
  }

  get customer() {
    return this.#customer;
  }

  get quantity() {
    return this.#quantity;
  }

  get month() {
    return this.#month;
  }

  get year() {
    return this.#year;
  }

  get baseRate() { // 속성에 접근하는 것처럼 getter
    if (this.#year === 2017 && this.#month === 5) {
      return 0.1;
    }
    return 0.2;
  }

  get baseCharge() {
    return this.baseRate * this.quantity; // getter 로 접근 가능
  }

  get taxThreshold() {
    return 0.1;
  }


  get taxableCharge() {
    return Math.max(0, this.baseCharge - this.taxThreshold);
  }
}

const reading = new Reading({
  customer: 'ivan',
  quantity: 10,
  month: 5,
  year: 2017
})

export function acquireReading() {
  return reading; // <- 6-6 과 같은 객체의 불변성 문제점
}