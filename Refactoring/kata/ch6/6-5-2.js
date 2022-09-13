export default class Book {
  #reservations;
  constructor() {
    this.#reservations = [];
  }

  addReservation(customer, isPriority = false) {
    this.#reservations.push(customer);
  }

  hasReservation(customer) {
    return this.#reservations.some(
      (reservedCustomer) => reservedCustomer.id === customer.id
    );
  }
}

// 추가적인 요구사항이 생길 때 마다, 매개변수를 추가해 함수에 변경을 발생하는 것은 좋지 않다.
// but, 정말 필요한 값은 default 값을 지정해준다.