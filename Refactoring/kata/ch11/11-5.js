/**
 * :NOTE
 * - 매개변수는 가능하면 사용하지 않는다를 머리속에 박기!
 * => 매개변수 -> 질의함수
 */

export class Order {
  constructor(quantity, itemPrice) {
    this.itemPrice = itemPrice;
    this._quantity = quantity;
  }

  get basePrice() {
    return this._quantity * this.itemPrice;
  }

  get discountLevel() {
    return this._quantity > 100 ? 2 : 1;
  }


  get finalPrice() {
    return this.#discountedPrice();
  }

  #discountedPrice() {
    switch (this.discountLevel) {
      case 1:
        return this.basePrice * 0.95;
      case 2:
        return this.basePrice * 0.9;
    }
  }
}
