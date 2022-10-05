/**
 * :NOTE
 * - 웹스톰에서 class 메서드 추가는 Cmd+N
 *
 * [문제점]
 * - 코드의 의도를 한 눈에 파악하기 어렵다.
 *
 * [해결]
 * - 부정 조건문 보단 긍정 조건문이 눈의 흐름(?)에 따라 읽기 쉽다고 생각해서 긍정 조건문으로 바꿔주기
 * - 어떤 조건을 확인하고 싶은건지 바로 파악할 수 있도록 변수로 추출 또는 질의 함수로 추출하기
 * - 연산이 필요한 로직은 질의 함수로 추출하기
 */

class Charge {
  #date
  #quantity
  #plan
  constructor(date, quantity, plan) {
    this.#date = date
    this.#quantity = quantity
    this.#plan = plan
  }

  get date() {
    return this.#date;
  }

  get quantity() {
    return this.#quantity;
  }

  get plan() {
    return this.#plan;
  }

  get regularCharge( ) {
    return this.quantity * this.plan.summerRate;
  }

  get summerCharge() {
    return this.quantity * this.plan.regularRate + this.plan.regularServiceCharge
  }

  get isSummer() {
    return this.date.isBefore(this.plan.summerStart) && this.date.isAfter(this.plan.summerEnd)
  }

  calculateCharge() {
    return this.isSummer ? this.summerCharge : this.regularCharge
  }
}