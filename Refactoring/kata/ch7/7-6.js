/**
 * 밀접된 정보끼린 하나의 클래스로 묶어두는 것이 좋다.
 *
 * [문제]
 * - 불필요하게 클래스로 나누는 것은 오히려 코드 복잡성을 높인다. (가독성 저하)
 */

export class Shipment {
  #shippingCompany;
  #trackingNumber;
  constructor(trackingNumber, shippingCompany) {
    this.#trackingNumber = trackingNumber;
    this.#shippingCompany = shippingCompany;
  }

  get shippingCompany() {
    return this.#shippingCompany;
  }

  set shippingCompany(arg) {
    this.#shippingCompany = arg;
  }

  get trackingNumber() {
    return this.#trackingNumber;
  }

  set trackingNumber(arg) {
    this.#trackingNumber = arg;
  }

  get trackingInformation() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }
}


const shipment = new Shipment(999, 'Maersk')

shipment.shippingCompany = 'COSCO';
console.log(shipment.trackingInformation);
