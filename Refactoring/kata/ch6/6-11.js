/**
 * 긴 함수는 각 단계별로 쪼개 함수로 만든다.
 * - 함수가 어떤 작업을 하고 있는지 명확히게 파악할 수 있다.
 * - 한 눈에 봐도 알아보기 좋은 코드는 인라인 해도 괜찮다. 하지만, 여러번 반복되면 함수로 추출한다.
 */

export class Order {
  #product;
  #shippingMethod;
  constructor(product, quantity, shippingMethod) {
    this.#product = product;
    this.quantity = quantity;
    this.#shippingMethod = shippingMethod;
  }

  get basePrice() {
    return this.#product.basePrice * this.quantity; // 상품 가격과 수량
  }

  get discount() {
    return Math.max(this.quantity - this.#product.discountThreshold, 0) * this.basePrice * this.#product.discountRate;
  }

  get shippingPerCase() {
    return this.basePrice > this.#shippingMethod.discountThreshold
      ? this.#shippingMethod.discountedFee
      : this.#shippingMethod.feePerCase;
  }

  get shippingCost() {
    return this.quantity * this.shippingPerCase; // 배송비
  }

  get price() {
    return this.basePrice - this.discount + this.shippingCost;
  }
}

// 사용 예:
const product = {
  basePrice: 10,
  discountRate: 0.1,
  discountThreshold: 10,
};

const shippingMethod = {
  discountThreshold: 20,
  feePerCase: 5,
  discountedFee: 3,
};

const price = new Order(product, 5, shippingMethod).price;
console.log('🚀 ~ price', price);
