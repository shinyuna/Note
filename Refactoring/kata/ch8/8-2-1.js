/**
 * [Note]
 * 함수/필드 옮기기의 목적은 모두 응집도를 높이기 위함이다.
 * - "최대한 근접한 곳으로 옮긴다." --> 한번에 완벽한 위치에 옮길 순 없음을 항상 인지하자.
 *
 * [해결]
 * 클래스의 역할과 밀접한 데이터를 함께 둔다.
 * --> discountRate 은 Customer에 있는 것 보단, contract에 위치하는게 좋다.
 * --> 손님이 할인되는게 아니라 계약서에 할인율이 적혀 있는게 좋겠쥬..?
 */

export class Customer {
  #name;
  #contract;
  constructor(name, discountRate) {
    this.#name = name;
    this.#contract = new CustomerContract(this.dateToday(), discountRate);
  }

  dateToday() {
    return new Date();
  }

  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this.#contract.discountRate));
  }

  becomePreferred() {
    let result = this.#contract.discountRate
    result += 0.03
    // 다른 코드들이 있음...
    return result
  }
}

class CustomerContract {
  #startDate;
  #discountRate;
  constructor(startDate, discountRate) {
    this.#startDate = startDate;
    this.#discountRate = discountRate;
  }

  get discountRate() {
    return this.#discountRate;
  }
}
