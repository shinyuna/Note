/**
 * [문제]
 * - 짧은 코드지만 한 눈에 어떤 행동을 하고 있는지 파악이 안된다.
 * - 상수를 변경하려고 한다.
 *
 * [해결]
 * - 메서드 내부에서 사용되는 임시 변수를 질의 함수로 바꿔 클래스 내부에서나 외부에서의 활용성을 높였다.
 */

class Order {
  #quantity;
  #item;
  constructor(quantity, item) {
    this.#quantity = quantity;
    this.#item = item;
  }

  get basePrice() {
    return this.#quantity * this.#item.price
  }

  get discountFactor() {
    return this.basePrice > 1000 ? 0.95 : 0.98
  }

  get price() {
    return this.basePrice * this.discountFactor
  }
}
