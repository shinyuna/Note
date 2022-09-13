export class Order {
  #data;
  constructor(aRecord) {
    this.#data = aRecord;
  }

  get quantity() {
    return this.#data.quantity;
  }
  get itemPrice() {
    return this.#data.itemPrice;
  }

  get price() {
    return this.basePrice - this.discount + this.shipping
  }

  get basePrice() {
    return this.quantity * this.itemPrice
  }
  get discount() {
    return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05
  }
  get shipping() {
    return Math.min(this.quantity * this.itemPrice * 0.1, 100)
  }
}

// 과거엔 _data 이런식으로 private 필드를 나타냈지만, 요즘엔 #data 로 private 필드를 나타낼 수 있다.
// 긴 표현식이 있을 땐, 변수(or 함수)로 추출해 내는게 코드 가독성으로도 디버깅하기도 좋다.