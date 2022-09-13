class Customer {
  constructor() {
    this.discountRate = 0;
  }
  applyDiscount(number) {
    return this.discountRate ? number - this.discountRate * number : number;
  }
}
